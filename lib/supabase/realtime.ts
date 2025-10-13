import { supabase } from './client';

// ===== REAL-TIME SUBSCRIPTIONS =====

export class RealtimeService {
  private subscriptions: Map<string, any> = new Map();

  // Subscribe to user profile updates
  subscribeToUserProfile(userId: string, callback: (payload: any) => void) {
    const channel = supabase
      .channel(`user-profile-${userId}`)
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

    this.subscriptions.set(`user-profile-${userId}`, channel);
    return channel;
  }

  // Subscribe to creator profile updates
  subscribeToCreatorProfile(creatorId: string, callback: (payload: any) => void) {
    const channel = supabase
      .channel(`creator-profile-${creatorId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'creator_profiles',
          filter: `id=eq.${creatorId}`,
        },
        callback
      )
      .subscribe();

    this.subscriptions.set(`creator-profile-${creatorId}`, channel);
    return channel;
  }

  // Subscribe to token updates
  subscribeToToken(tokenId: string, callback: (payload: any) => void) {
    const channel = supabase
      .channel(`token-${tokenId}`)
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

    this.subscriptions.set(`token-${tokenId}`, channel);
    return channel;
  }

  // Subscribe to user's transactions
  subscribeToUserTransactions(userId: string, callback: (payload: any) => void) {
    const channel = supabase
      .channel(`user-transactions-${userId}`)
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

    this.subscriptions.set(`user-transactions-${userId}`, channel);
    return channel;
  }

  // Subscribe to token transactions
  subscribeToTokenTransactions(tokenId: string, callback: (payload: any) => void) {
    const channel = supabase
      .channel(`token-transactions-${tokenId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'transactions',
          filter: `token_id=eq.${tokenId}`,
        },
        callback
      )
      .subscribe();

    this.subscriptions.set(`token-transactions-${tokenId}`, channel);
    return channel;
  }

  // Subscribe to wallet updates
  subscribeToUserWallets(userId: string, callback: (payload: any) => void) {
    const channel = supabase
      .channel(`user-wallets-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'wallets',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();

    this.subscriptions.set(`user-wallets-${userId}`, channel);
    return channel;
  }

  // Subscribe to perk updates
  subscribeToPerks(creatorId: string, callback: (payload: any) => void) {
    const channel = supabase
      .channel(`perks-${creatorId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'perks',
          filter: `creator_id=eq.${creatorId}`,
        },
        callback
      )
      .subscribe();

    this.subscriptions.set(`perks-${creatorId}`, channel);
    return channel;
  }

  // Subscribe to perk redemptions
  subscribeToPerkRedemptions(userId: string, callback: (payload: any) => void) {
    const channel = supabase
      .channel(`perk-redemptions-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'perk_redemptions',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();

    this.subscriptions.set(`perk-redemptions-${userId}`, channel);
    return channel;
  }

  // Subscribe to notifications
  subscribeToNotifications(userId: string, callback: (payload: any) => void) {
    const channel = supabase
      .channel(`notifications-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();

    this.subscriptions.set(`notifications-${userId}`, channel);
    return channel;
  }

  // Subscribe to blockchain events
  subscribeToBlockchainEvents(callback: (payload: any) => void) {
    const channel = supabase
      .channel('blockchain-events')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blockchain_events',
        },
        callback
      )
      .subscribe();

    this.subscriptions.set('blockchain-events', channel);
    return channel;
  }

  // Unsubscribe from a specific channel
  unsubscribe(channelName: string) {
    const channel = this.subscriptions.get(channelName);
    if (channel) {
      supabase.removeChannel(channel);
      this.subscriptions.delete(channelName);
    }
  }

  // Unsubscribe from all channels
  unsubscribeAll() {
    this.subscriptions.forEach((channel, name) => {
      supabase.removeChannel(channel);
    });
    this.subscriptions.clear();
  }

  // Get active subscriptions
  getActiveSubscriptions() {
    return Array.from(this.subscriptions.keys());
  }
}

// ===== GLOBAL REALTIME SERVICE INSTANCE =====

export const realtimeService = new RealtimeService();

// ===== HELPER FUNCTIONS =====

export function subscribeToUserDashboard(userId: string, callbacks: {
  onProfileUpdate?: (payload: any) => void;
  onTransactionUpdate?: (payload: any) => void;
  onWalletUpdate?: (payload: any) => void;
  onNotificationUpdate?: (payload: any) => void;
}) {
  const subscriptions: any[] = [];

  if (callbacks.onProfileUpdate) {
    subscriptions.push(realtimeService.subscribeToUserProfile(userId, callbacks.onProfileUpdate));
  }

  if (callbacks.onTransactionUpdate) {
    subscriptions.push(realtimeService.subscribeToUserTransactions(userId, callbacks.onTransactionUpdate));
  }

  if (callbacks.onWalletUpdate) {
    subscriptions.push(realtimeService.subscribeToUserWallets(userId, callbacks.onWalletUpdate));
  }

  if (callbacks.onNotificationUpdate) {
    subscriptions.push(realtimeService.subscribeToNotifications(userId, callbacks.onNotificationUpdate));
  }

  return {
    unsubscribe: () => {
      subscriptions.forEach(channel => {
        supabase.removeChannel(channel);
      });
    },
  };
}

export function subscribeToCreatorDashboard(creatorId: string, callbacks: {
  onTokenUpdate?: (payload: any) => void;
  onPerkUpdate?: (payload: any) => void;
  onTransactionUpdate?: (payload: any) => void;
}) {
  const subscriptions: any[] = [];

  if (callbacks.onTokenUpdate) {
    // Subscribe to all tokens for this creator
    subscriptions.push(supabase
      .channel(`creator-tokens-${creatorId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'creator_tokens',
          filter: `creator_id=eq.${creatorId}`,
        },
        callbacks.onTokenUpdate
      )
      .subscribe());
  }

  if (callbacks.onPerkUpdate) {
    subscriptions.push(realtimeService.subscribeToPerks(creatorId, callbacks.onPerkUpdate));
  }

  if (callbacks.onTransactionUpdate) {
    // Subscribe to all transactions for this creator's tokens
    subscriptions.push(supabase
      .channel(`creator-transactions-${creatorId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'transactions',
          filter: `token_id=in.(${creatorId})`, // This would need to be populated with actual token IDs
        },
        callbacks.onTransactionUpdate
      )
      .subscribe());
  }

  return {
    unsubscribe: () => {
      subscriptions.forEach(channel => {
        supabase.removeChannel(channel);
      });
    },
  };
}
