import { supabase } from './client';
import { User } from '@supabase/supabase-js';

// ===== AUTHENTICATION HELPERS =====

export async function signUp(email: string, password: string, userData: {
  displayName: string;
  username: string;
  bio?: string;
  isCreator?: boolean;
}) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: userData.displayName,
          username: userData.username,
          bio: userData.bio,
          is_creator: userData.isCreator || false,
        },
      },
    });

    if (error) throw error;

    // Create user profile in our custom users table
    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: data.user.email!,
          display_name: userData.displayName,
          username: userData.username,
          bio: userData.bio,
          is_creator: userData.isCreator || false,
        });

      if (profileError) throw profileError;

      // Create creator profile if user is a creator
      if (userData.isCreator) {
        const { error: creatorError } = await supabase
          .from('creator_profiles')
          .insert({
            user_id: data.user.id,
            is_public: true,
          });

        if (creatorError) throw creatorError;
      }
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    return { error };
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function getCurrentUserProfile() {
  try {
    const user = await getCurrentUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        creator_profile:creator_profiles(*),
        wallets(*)
      `)
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

// ===== REAL-TIME SUBSCRIPTIONS =====

export function subscribeToUserUpdates(userId: string, callback: (payload: any) => void) {
  return supabase
    .channel('user-updates')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'users',
        filter: `id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
}

export function subscribeToTokenUpdates(tokenId: string, callback: (payload: any) => void) {
  return supabase
    .channel('token-updates')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'creator_tokens',
        filter: `id=eq.${tokenId}`,
      },
      callback
    )
    .subscribe();
}

export function subscribeToTransactionUpdates(userId: string, callback: (payload: any) => void) {
  return supabase
    .channel('transaction-updates')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'transactions',
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
}

// ===== WALLET INTEGRATION =====

export async function connectWallet(userId: string, walletData: {
  address: string;
  walletType: string;
  isCustodial?: boolean;
}) {
  try {
    const { data, error } = await supabase
      .from('wallets')
      .insert({
        user_id: userId,
        address: walletData.address,
        wallet_type: walletData.walletType,
        is_custodial: walletData.isCustodial || false,
        is_active: true,
        chain_id: 8453, // Base mainnet
        network_name: 'base',
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

// ===== TOKEN OPERATIONS =====

export async function createToken(creatorId: string, tokenData: {
  name: string;
  symbol: string;
  description?: string;
  imageUrl?: string;
  totalSupply?: string;
  startingPrice: string;
  maxTokensPerFan?: string;
  allowFutureMinting?: boolean;
}) {
  try {
    const { data, error } = await supabase
      .from('creator_tokens')
      .insert({
        creator_id: creatorId,
        name: tokenData.name,
        symbol: tokenData.symbol,
        description: tokenData.description,
        image_url: tokenData.imageUrl,
        total_supply: tokenData.totalSupply || '1000000',
        current_supply: '0',
        starting_price: tokenData.startingPrice,
        current_price: tokenData.startingPrice,
        max_tokens_per_fan: tokenData.maxTokensPerFan || '1000',
        allow_future_minting: tokenData.allowFutureMinting || false,
        is_deployed: false,
        total_holders: 0,
        total_volume: '0',
        floor_price: tokenData.startingPrice,
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

// ===== PERK OPERATIONS =====

export async function createPerk(creatorId: string, tokenId: string, perkData: {
  title: string;
  description: string;
  type: string;
  minTokensRequired?: string;
  maxRedemptions?: number;
}) {
  try {
    const { data, error } = await supabase
      .from('perks')
      .insert({
        creator_id: creatorId,
        token_id: tokenId,
        title: perkData.title,
        description: perkData.description,
        type: perkData.type,
        is_active: true,
        min_tokens_required: perkData.minTokensRequired,
        max_redemptions: perkData.maxRedemptions,
        current_redemptions: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

// ===== TRANSACTION OPERATIONS =====

export async function createTransaction(transactionData: {
  userId: string;
  walletId: string;
  tokenId?: string;
  type: string;
  amount: string;
  price?: string;
  totalValue: string;
  txHash?: string;
  blockNumber?: string;
  description?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        user_id: transactionData.userId,
        wallet_id: transactionData.walletId,
        token_id: transactionData.tokenId,
        type: transactionData.type,
        amount: transactionData.amount,
        price: transactionData.price,
        total_value: transactionData.totalValue,
        tx_hash: transactionData.txHash,
        block_number: transactionData.blockNumber,
        status: 'PENDING',
        description: transactionData.description,
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
