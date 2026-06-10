'use client';

import { useEffect } from 'react';
import { useDesignStore } from '@/store/useDesignStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setIsAuthLoading, loadSavedDesigns } = useDesignStore();

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'session' }),
        });
        const data = await res.json();
        if (res.ok && data.user) {
          setUser(data.user);
        }
      } catch {
        setUser(null);
      } finally {
        setIsAuthLoading(false);
        loadSavedDesigns();
      }
    };
    init();
  }, [setUser, setIsAuthLoading, loadSavedDesigns]);

  return <>{children}</>;
}
