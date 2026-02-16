/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // UCF Official Colors
                ucf: {
                    black: '#000000',
                    gold: '#FFC904',
                    'gold-dark': '#BA9B37', // Knights Gold
                },
                // Primary palette based on UCF Gold
                primary: {
                    50: '#fffbeb',
                    100: '#fff4c6',
                    200: '#ffe888',
                    300: '#ffd84a',
                    400: '#ffc904', // UCF Bright Gold
                    500: '#f5b800',
                    600: '#d99200',
                    700: '#b46902',
                    800: '#925207',
                    900: '#78430b',
                },
                // Accent using darker gold tones
                accent: {
                    50: '#fdfcf7',
                    100: '#f9f5e8',
                    200: '#f2e9c9',
                    300: '#e8d9a0',
                    400: '#d9c26e',
                    500: '#BA9B37', // UCF Knights Gold
                    600: '#a68630',
                    700: '#8a6e28',
                    800: '#725926',
                    900: '#604a23',
                },
                // Neutral grays
                neutral: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#000000', // UCF Black
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}
