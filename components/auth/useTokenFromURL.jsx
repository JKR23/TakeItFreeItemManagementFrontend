'use client';

import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

export default function useTokenFromURL() {
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const token = searchParams.get('token');

        if (token) {
            console.log('🔐 Token extrait depuis l’URL :', token);
            localStorage.setItem('token', token);

            // Supprime le paramètre "token" de l’URL après stockage
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        }
    }, [searchParams]);
}
