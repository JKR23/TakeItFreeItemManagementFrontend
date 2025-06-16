// Section3.jsx
import Cliclogo from '@/public/img/cliclogo.jpg';
import Explorelogo from '@/public/img/explorelogo.jpg';
import Itinerairelogo from '@/public/img/itinerairelogo.jpg';
import Recuperelogo from '@/public/img/recuperelogo.png';

import Image from 'next/image';

export default function Section3() {
    const steps = [
        {
            img: Explorelogo,
            alt: 'Étape 1',
            text: 'Aller sur Explore-items',
        },
        {
            img: Cliclogo,
            alt: 'Étape 2',
            text: 'Cliquer sur un item au choix',
        },
        {
            img: Itinerairelogo,
            alt: 'Étape 3',
            text: 'Suivez l’itinéraire',
        },
        {
            img: Recuperelogo,
            alt: 'Étape 4',
            text: 'Prenez-le, c’est gratuit !',
        },
    ];

    return (
        <div className="bg-green-900 text-white py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="font-bold text-3xl mb-12 text-center">Comment ça marche ?</h2>

                <div className="flex flex-wrap justify-center gap-8">
                    {steps.map(({ img, alt, text }, i) => (
                        <div
                            key={i}
                            className="bg-green-800 rounded-lg shadow-lg p-6 flex flex-col items-center justify-between max-w-xs w-full sm:w-64 h-80"
                        >
                            <Image
                                src={img}
                                alt={alt}
                                width={160}
                                height={160}
                                className="rounded object-contain"
                            />
                            <p className="text-center mt-4 text-base">
                                <strong>Étape {i + 1} :</strong> <br />
                                {text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
