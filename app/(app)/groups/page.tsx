'use client';

import dynamic from 'next/dynamic';
import PageLoader from '@/components/PageLoader';

const GroupManagement = dynamic(() => import('@/pages/GroupManagement'), {
    loading: () => <PageLoader />,
    ssr: false
});

export default function GroupsPage() {
    return <GroupManagement />;
}
