'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Utility to get the correct redirect URL
const getRedirectURL = () => {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL || // Production site URL
    process.env.NEXT_PUBLIC_VERCEL_URL || // Automatically set by Vercel
    'http://localhost:3000'; // Default for local development

  // Ensure the URL starts with "http" and ends with a "/"
  return url.startsWith('http') ? url.replace(/\/?$/, '/') : `https://${url}/`;
};

// Sign in with Twitch
export const signInWithTwitch = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'twitch',
      options: {
        redirectTo: getRedirectURL(),
        scopes: 'user:read:email',
      },
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing in with Twitch:', error.message);
    throw error;
  }
};

// Sign out the current user
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
};

// Get the current authenticated user
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error getting current user:', error.message);
    return null;
  }
};

// Custom hook to manage authentication state
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the initial user
    getCurrentUser().then((user) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
};