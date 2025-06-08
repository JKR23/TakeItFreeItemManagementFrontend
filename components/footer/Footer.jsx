import Logo from '@/public/img/logo.png';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

export default function Footers() {
    return (
        <footer className="bg-green-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Slogan */}
                    <div className="flex flex-col items-center sm:items-start">
                        <Image
                            src={Logo}
                            alt="Logo TakeItFree"
                            width={80}
                            height={80}
                            className="rounded-full cursor-pointer"
                        />
                        <div className="mt-4 text-center sm:text-left">
                            <h2 className="bg-green-900 text-white text-base sm:text-lg md:text-xl font-bold px-4 py-2 rounded leading-tight">
                                Just for You <br className="hidden sm:inline" /> Take it Free
                            </h2>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-green-400">Navigation</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="text-white/80 hover:text-green-300 transition duration-300"
                                >
                                    TakeItFree
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/explore-items"
                                    className="text-white/80 hover:text-green-300 transition duration-300"
                                >
                                    Explore-items
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/publier-items"
                                    className="text-white/80 hover:text-green-300 transition duration-300"
                                >
                                    Publier-items
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contactez-nous"
                                    className="text-white/80 hover:text-green-300 transition duration-300"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Approche */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-green-400">Aproche</h3>
                        <p className="text-sm text-white/80 text-justify">
                            Notre approche repose sur l'écoute de vos besoins et une interaction
                            personnalisée. Chaque objet a son histoire et sa valeur, c'est pourquoi
                            nous traitons chaque publication avec attention afin de faciliter les
                            échanges les plus utiles et gratifiants.
                        </p>
                    </div>

                    {/* Équipe */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-green-400">Mission</h3>
                        <p className="text-sm text-white/80 text-justify">
                            TakeItFree est à l’écoute de vos besoins et facilite les échanges de
                            manière personnalisée. Chaque objet a sa propre valeur et utilité :
                            c’est pourquoi nous traitons chaque publication avec soin, afin de
                            promouvoir des échanges utiles et durables. Quelle que soit la taille ou
                            la nature de l'objet, notre plateforme applique la même rigueur pour
                            garantir une expérience fiable, adaptée et bénéfique pour tous.
                        </p>
                    </div>
                </div>

                <div className="border-t border-white/30 mt-12 pt-20 text-center text-white/60 text-sm">
                    © 2025 TakeItFree - Dorumashin. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
