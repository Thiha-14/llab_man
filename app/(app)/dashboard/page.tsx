'use client';

import dynamic from 'next/dynamic';
import PageLoader from '@/components/PageLoader';

const Dashboard = dynamic(() => import('@/pages/Dashboard'), {
    loading: () => <PageLoader />,
    ssr: false
});

export default function DashboardPage() {
    return <Dashboard />;
}
