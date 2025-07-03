'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

export default function TokenHandler({ children }) {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            console.log('✅ Token détecté dans TokenHandler :', token);
            localStorage.setItem('token', token);

            // Nettoyer l’URL après stockage
            const url = new URL(window.location.href);
            url.searchParams.delete('token');
            window.history.replaceState({}, '', url.toString());
        } else {
            console.log("❌ Aucun token dans l'URL (TokenHandler)");
        }
    }, [searchParams]);

    return <>{children}</>;
}
