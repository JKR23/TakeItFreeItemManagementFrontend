import Cliclogo from '@/public/img/cliclogo.jpg';
import Explorelogo from '@/public/img/explorelogo.jpg';
import Itinerairelogo from '@/public/img/itinerairelogo.jpg';
import Recuperelogo from '@/public/img/recuperelogo.png';

import Image from 'next/image';

export default function Section3() {
    return (
        <div className="bg-green-900 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <h2 className="font-bold text-3xl mb-12 text-center">Comment ça marche ?</h2>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                    {/* Étape 1 */}
                    <div className="bg-green-800 rounded-lg shadow-lg p-6 w-64 h-80 flex flex-col items-center justify-between">
                        <Image
                            src={Explorelogo}
                            alt="etape1"
                            width={160}
                            height={160}
                            className="rounded"
                        />
                        <p className="text-center mt-4">
                            <strong>Étape 1 :</strong> <br />
                            Aller sur Explore-items
                        </p>
                    </div>

                    {/* Étape 2 */}
                    <div className="bg-green-800 rounded-lg shadow-lg p-6 w-64 h-80 flex flex-col items-center justify-between">
                        <Image
                            src={Cliclogo}
                            alt="etape2"
                            width={160}
                            height={160}
                            className="rounded"
                        />
                        <p className="text-center mt-4">
                            <strong>Étape 2 :</strong> <br />
                            Cliquer sur un item au choix
                        </p>
                    </div>

                    {/* Étape 3 */}
                    <div className="bg-green-800 rounded-lg shadow-lg p-6 w-64 h-80 flex flex-col items-center justify-between">
                        <Image
                            src={Itinerairelogo}
                            alt="etape3"
                            width={160}
                            height={160}
                            className="rounded"
                        />
                        <p className="text-center mt-4">
                            <strong>Étape 3 :</strong> <br />
                            Suivez l’itinéraire
                        </p>
                    </div>

                    {/* Étape 4 */}
                    <div className="bg-green-800 rounded-lg shadow-lg p-6 w-64 h-80 flex flex-col items-center justify-between">
                        <Image
                            src={Recuperelogo}
                            alt="etape4"
                            width={160}
                            height={160}
                            className="rounded"
                        />
                        <p className="text-center mt-4">
                            <strong>Étape 4 :</strong> <br />
                            Prenez-le, c’est gratuit !
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
