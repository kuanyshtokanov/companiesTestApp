import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuth from '../context/AuthProvider';

export function ProtectRoute(Component) {
  return () => {
    const { user, isAuthenticated, loading, login } = useAuth();
    const router = useRouter()

    useEffect(() => {
      if (!isAuthenticated && !loading) Router.push('/login')
    }, [loading, isAuthenticated])

    return (<Component {...arguments} />)
  }
}