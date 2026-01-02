'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { useEffect } from 'react';

export default function RootPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        router.prefetch('/dashboard');
        router.prefetch('/login');
    }, [router]);

    useEffect(() => {
        if (!loading) {
            if (user) {
                router.push('/dashboard');
            } else {
                router.push('/login');
            }
        }
    }, [user, loading, router]);

    return (
        <div className="flex h-screen items-center justify-center bg-zinc-950">
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <div className="space-y-1">
                    <span className="text-white font-bold tracking-[0.2em] text-lg block uppercase">SmartLab</span>
                    <span className="text-blue-500 font-medium tracking-widest text-xs animate-pulse">Loading...</span>
                </div>
            </div>
        </div>
    );
}
