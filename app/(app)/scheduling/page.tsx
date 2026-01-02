'use client';

import dynamic from 'next/dynamic';
import PageLoader from '@/components/PageLoader';

const Scheduling = dynamic(() => import('@/pages/Scheduling'), {
    loading: () => <PageLoader />,
    ssr: false
});

export default function SchedulingPage() {
    return <Scheduling />;
}
