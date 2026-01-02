'use client';

import dynamic from 'next/dynamic';
import { useAuth } from '@/app/AuthContext';
import { UserRole } from '@/types';
import PageLoader from '@/components/PageLoader';

const LabManagement = dynamic(() => import('@/pages/LabManagement'), {
    loading: () => <PageLoader />,
    ssr: false
});

export default function LabsPage() {
    const { user } = useAuth();
    return <LabManagement role={user?.role || UserRole.USER} />;
}
