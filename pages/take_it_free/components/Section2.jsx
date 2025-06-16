// Section2.jsx
import MyImage from '@/public/img/FreeArbre.png';

import Image from 'next/image';

export default function Section2() {
    return (
        <div className="bg-green-900 text-white py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                {/* Gauche - Texte */}
                <div className="md:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold leading-snug max-w-lg">
                        C&apos;est quoi Take it Free ?
                    </h2>
                    <p className="mt-4 text-lg sm:text-xl leading-relaxed text-justify max-w-lg">
                        Voici l’application qui vous aide à donner et à récupérer des objets
                        gratuitement, tout en leur offrant une seconde vie.
                    </p>
                </div>

                {/* Droite - Image */}
                <div className="md:w-1/2 flex justify-center">
                    <Image
                        src={MyImage}
                        alt="Marché TakeItFree"
                        width={350}
                        height={350}
                        className="rounded-lg shadow-lg object-contain"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
