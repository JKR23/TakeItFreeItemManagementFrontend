'use client';

import Logo from '@/public/img/logo.png';
import { Menu, X } from 'lucide-react';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const baseNavItems = [
    { label: 'TakeItFree', href: '/' },
    { label: 'Explore-Items', href: '/explore-items' },
    { label: 'Publier-Items', href: '/publier-items', auth: true },
    { label: 'Mes-Items', href: '/mes-items', auth: true },
    { label: 'Contactez-nous', href: '/contactez-nous' },
];

export default function NavBars() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);
    const isActive = (href) => pathname === href;

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token');
            console.log('🔍 Token dans NavBars:', token);
            setIsAuthenticated(!!token);
        };

        checkToken();
        const intervalId = setInterval(checkToken, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch(
                'https://takeitfreeauthbackend-83rr.onrender.com/user/logout',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.ok) {
                console.log('✅ Déconnexion réussie côté backend');
            } else {
                console.warn('❌ Échec de la déconnexion côté backend');
            }
        } catch (error) {
            console.error('Erreur lors de la déconnexion :', error);
        } finally {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            closeMenu();
            router.push('/');
        }
    };

    const navItems = baseNavItems.filter((item) => !item.auth || isAuthenticated);

    return (
        <nav className="bg-green-800 text-secondary-color shadow-md relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                <Link href="/">
                    <Image
                        src={Logo}
                        alt="Logo TakeItFree"
                        width={70}
                        height={70}
                        className="rounded-full cursor-pointer"
                    />
                </Link>

                <button
                    className="sm:hidden text-black z-50"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                <ul className="hidden sm:flex gap-8 text-base sm:text-lg font-semibold items-center">
                    {navItems.map(({ label, href }, i) => (
                        <li key={i}>
                            <Link
                                href={href}
                                className={`transition ${
                                    isActive(href) ? 'text-green-300' : 'hover:text-green-300'
                                }`}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                    {isAuthenticated && (
                        <li>
                            <button
                                onClick={handleLogout}
                                className="text-red-300 hover:text-red-500 transition cursor-pointer"
                            >
                                Déconnexion
                            </button>
                        </li>
                    )}
                </ul>
            </div>

            {/* Mobile overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                } sm:hidden`}
                onClick={closeMenu}
            ></div>

            {/* Mobile menu */}
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
                            onClick={closeMenu}
                            className={`w-full ${
                                isActive(href)
                                    ? 'text-yellow-500'
                                    : 'hover:text-yellow-500 text-gray-800'
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            className="w-full text-left text-red-500 hover:text-red-700"
                        >
                            Déconnexion
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
