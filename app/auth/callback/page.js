'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/utils/auth';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSessionFromUrl();

      if (error) {
        console.error('Error handling auth callback:', error.message);
        return;
      }

      // Redirect to the home page or dashboard after successful login
      router.push('/');
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="text-center">
        <p className="text-lg text-zinc-400">Processing authentication...</p>
      </div>
    </div>
  );
}