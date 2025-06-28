'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function withAuth<P extends Record<string, unknown>>(Component: React.ComponentType<P>) {
  return function ProtectedRoute(props: P) {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = localStorage.getItem('auth') === 'true';
      if (!isAuthenticated) {
        router.push('/');
      }
    }, [router]);

    return <Component {...props} />;
  };
}
