'use client';

import dynamic from 'next/dynamic';
import PageLoader from '@/components/PageLoader';

const UserManagement = dynamic(() => import('@/pages/UserManagement'), {
    loading: () => <PageLoader />,
    ssr: false
});

export default function UsersPage() {
    return <UserManagement />;
}
