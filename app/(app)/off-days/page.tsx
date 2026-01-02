'use client';

import dynamic from 'next/dynamic';
import PageLoader from '@/components/PageLoader';

const OffDays = dynamic(() => import('@/pages/OffDays'), {
    loading: () => <PageLoader />,
    ssr: false
});

export default function OffDaysPage() {
    return <OffDays />;
}
