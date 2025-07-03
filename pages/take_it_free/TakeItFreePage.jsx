'use client';

import Section1 from '@/pages/take_it_free/components/Section1';
import Section2 from '@/pages/take_it_free/components/Section2';
import Section3 from '@/pages/take_it_free/components/Section3';
import TokenHandler from '@/pages/take_it_free/components/TokenHandler';

export default function TakeItFreePage() {
    return (
        <TokenHandler>
            <Section1 />
            <Section2 />
            <Section3 />
        </TokenHandler>
    );
}
