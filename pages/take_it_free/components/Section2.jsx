import MyImage from '@/public/img/FreeArbre.png';

import Image from 'next/image';

export default function Section2() {
    return (
        <div className="bg-green-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between">
                {/* Gauche - Texte */}
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                    <h2 className="text-3xl md:text-4xl font-bold leading-snug">
                        C'est quoi Take it Free ?
                    </h2>
                    <p className="mt-4 text-4xl leading-relaxed text-justify">
                        Voici l’application qui vous aide à donner et à récupérer des objets
                        gratuitement, tout en leur offrant une seconde vie.
                    </p>
                </div>

                {/* Droite - Image */}
                <div className="md:w-1/2 flex justify-center">
                    <Image
                        src={MyImage}
                        alt="Marché TakeItFree"
                        width={400}
                        height={400}
                        className="rounded-lg shadow-lg object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
