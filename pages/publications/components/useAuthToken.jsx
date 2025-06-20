'use client';

import { jwtDecode } from 'jwt-decode';

import { useEffect, useState } from 'react';

function isTokenExpired(token) {
    if (!token) return true;
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
    } catch (e) {
        return true;
    }
}

// ✅ BONNE PRATIQUE : export par défaut
export default function useAuthToken({ redirectIfExpired = true } = {}) {
    const [token, setToken] = useState(null);
    const [decodedToken, setDecodedToken] = useState(null);
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const localToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        console.log('Token récupéré depuis localStorage:', localToken);

        if (localToken) {
            setToken(localToken);
            const expired = isTokenExpired(localToken);
            setIsExpired(expired);

            if (!expired) {
                try {
                    setDecodedToken(jwtDecode(localToken));
                } catch (e) {
                    console.error('Décodage échoué', e);
                }
            } else if (redirectIfExpired) {
                setTimeout(() => {
                    window.location.href = '/connexion';
                }, 1500);
            }
        } else {
            setIsExpired(true);
        }
    }, []);

    return { token, decodedToken, isExpired };
}
