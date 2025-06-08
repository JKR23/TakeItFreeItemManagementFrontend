'use client';

import Logo from '@/public/img/logo.png';
import { Menu, X } from 'lucide-react';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

const navItems = [
    { label: 'TakeItFree', href: '/' },
    { label: 'Explore-Items', href: '/explore-items' },
    { label: 'Publier-Items', href: '/publier-items' },
    /*{ label: 'Apropos', href: '/realisations' }, */
    { label: 'Contactez-nous', href: '/contactez-nous' },
];

export default function NavBars() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="bg-green-800 text-secondary-color shadow-md relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/">
                    <Image
                        src={Logo}
                        alt="Logo TakeItFre"
                        width={70}
                        height={70}
                        className="rounded-full cursor-pointer"
                    />
                </Link>

                {/* Hamburger button */}
                <button
                    className="sm:hidden text-black z-50"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Menu desktop */}
                <ul className="hidden sm:flex gap-8 text-base sm:text-lg font-semibold">
                    {navItems.map(({ label, href }, i) => (
                        <li key={i}>
                            <Link href={href} className="hover:text-green-300 transition">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Overlay + mobile menu */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                } sm:hidden`}
                onClick={closeMenu}
            ></div>

            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 sm:hidden ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col items-start p-6 gap-6 text-lg font-medium">
                    {navItems.map(({ label, href }, i) => (
                        <Link
                            key={i}
                            href={href}
                            className="hover:text-yellow-500 w-full"
                            onClick={closeMenu}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
