import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Database types for TypeScript
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          display_name: string;
          username: string;
          bio: string | null;
          avatar_url: string | null;
          is_creator: boolean;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          display_name: string;
          username: string;
          bio?: string | null;
          avatar_url?: string | null;
          is_creator?: boolean;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string;
          username?: string;
          bio?: string | null;
          avatar_url?: string | null;
          is_creator?: boolean;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      creator_profiles: {
        Row: {
          id: string;
          user_id: string;
          twitter_handle: string | null;
          instagram_handle: string | null;
          youtube_channel: string | null;
          website: string | null;
          total_followers: number;
          total_revenue: number;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          twitter_handle?: string | null;
          instagram_handle?: string | null;
          youtube_channel?: string | null;
          website?: string | null;
          total_followers?: number;
          total_revenue?: number;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          twitter_handle?: string | null;
          instagram_handle?: string | null;
          youtube_channel?: string | null;
          website?: string | null;
          total_followers?: number;
          total_revenue?: number;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      wallets: {
        Row: {
          id: string;
          user_id: string;
          address: string;
          wallet_type: string;
          is_active: boolean;
          is_custodial: boolean;
          chain_id: number;
          network_name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          address: string;
          wallet_type: string;
          is_active?: boolean;
          is_custodial?: boolean;
          chain_id?: number;
          network_name?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          address?: string;
          wallet_type?: string;
          is_active?: boolean;
          is_custodial?: boolean;
          chain_id?: number;
          network_name?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      creator_tokens: {
        Row: {
          id: string;
          creator_id: string;
          name: string;
          symbol: string;
          description: string | null;
          image_url: string | null;
          total_supply: string;
          current_supply: string;
          starting_price: string;
          current_price: string;
          max_tokens_per_fan: string;
          allow_future_minting: boolean;
          contract_address: string | null;
          token_id: string | null;
          deployment_tx_hash: string | null;
          is_deployed: boolean;
          total_holders: number;
          total_volume: string;
          floor_price: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          creator_id: string;
          name: string;
          symbol: string;
          description?: string | null;
          image_url?: string | null;
          total_supply?: string;
          current_supply?: string;
          starting_price: string;
          current_price?: string;
          max_tokens_per_fan?: string;
          allow_future_minting?: boolean;
          contract_address?: string | null;
          token_id?: string | null;
          deployment_tx_hash?: string | null;
          is_deployed?: boolean;
          total_holders?: number;
          total_volume?: string;
          floor_price?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          creator_id?: string;
          name?: string;
          symbol?: string;
          description?: string | null;
          image_url?: string | null;
          total_supply?: string;
          current_supply?: string;
          starting_price?: string;
          current_price?: string;
          max_tokens_per_fan?: string;
          allow_future_minting?: boolean;
          contract_address?: string | null;
          token_id?: string | null;
          deployment_tx_hash?: string | null;
          is_deployed?: boolean;
          total_holders?: number;
          total_volume?: string;
          floor_price?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
