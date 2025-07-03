'use client';

import { useEffect, useState } from 'react';

export default function SearchZone({ onResults }) {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (!query.trim()) {
                onResults(null); // Signifie : recharger tous les items par défaut
                return;
            }

            setLoading(true);
            setError('');
            try {
                const response = await fetch(
                    `https://takeitfreeitemmanagement.onrender.com/item/by-title?title=${encodeURIComponent(query)}`,
                );
                if (!response.ok) throw new Error('Erreur lors de la recherche');
                const data = await response.json();
                onResults(data);
            } catch (err) {
                console.error(err);
                setError('❌ Une erreur est survenue');
            } finally {
                setLoading(false);
            }
        }, 400); // Petit délai pour éviter de trop spammer le backend

        return () => clearTimeout(delayDebounce);
    }, [query]);

    return (
        <div className="flex flex-col gap-2 p-4">
            <input
                type="text"
                placeholder="Rechercher un item : ex: télévision"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
            />
            {loading && <p className="text-gray-500 text-sm">Recherche en cours...</p>}
            {error && <p className="text-red-600">{error}</p>}
        </div>
    );
}
