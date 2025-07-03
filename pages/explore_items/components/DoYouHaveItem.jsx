'use client';

import { useRouter } from 'next/navigation';

export default function DoYouHaveItem() {
    const handleClick = () => {
        const token = localStorage.getItem('access_token');

        if (token) {
            // Redirige vers la page de publication d'items si connecté
            window.location.href =
                'https://take-it-free-item-management-fronte.vercel.app/publier-items';
        } else {
            // Redirige vers la page d'authentification si non connecté
            window.location.href = 'https://takeitfree-auth-frontend.vercel.app/';
        }
    };

    return (
        <div className="mt-6 px-4 py-4 w-72 ml-2 sm:ml-4 rounded-lg shadow-md bg-green-900">
            <div className="text-lg font-semibold mb-2 text-white">
                Vous avez des items à donner ?
            </div>
            <div>
                <button
                    onClick={handleClick}
                    className="px-4 py-2 bg-green-700 text-white cursor-pointer rounded hover:bg-green-800 transition"
                >
                    Cliquez ici pour publier
                </button>
            </div>
        </div>
    );
}
