/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'dominant-color': '#1E40AF',
                'secondary-color': '#F59E0B',
                background: 'hsl(var(--background) / <alpha-value>)',
                foreground: 'hsl(var(--foreground) / <alpha-value>)',
            },
            fontFamily: {
                amasi: ['"Amasi"', 'sans-serif'],
                poppins: ['"Poppins"', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
