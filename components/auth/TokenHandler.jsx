'use client';

import useTokenFromURL from '@/components/auth/useTokenFromURL';

export default function TokenHandler() {
    useTokenFromURL();
    return null;
}
