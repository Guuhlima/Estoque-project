// src/components/withAuth.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return function ProtectedRoute(props: any) {
    const router = useRouter();
    const isAuthenticated = typeof window !== 'undefined' && !!localStorage.getItem('auth');

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/');
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
