'use client';

import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/app/AuthContext';
import { useRouter } from 'next/navigation';

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { user, handleLogout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        router.prefetch('/login');
    }, [router]);

    if (!user) return null;

    const handleLogoutAndRedirect = () => {
        handleLogout();
        router.push('/login');
    };

    return (
        <Layout user={user} onLogout={handleLogoutAndRedirect}>
            {children}
        </Layout>
    );
}
