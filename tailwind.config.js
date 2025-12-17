/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Earthy Editorial Palette
                primary: {
                    DEFAULT: '#264653', // Deep Forest Green
                    light: '#2A9D8F',   // Persian Green
                    dark: '#1D3540',
                    50: '#F0F5F6',
                    100: '#E1EBED',
                    200: '#C2D7DB',
                    300: '#A4C3C9',
                    400: '#85AFB7',
                    500: '#264653',
                    600: '#1E3842',
                    700: '#172A32',
                    800: '#0F1C21',
                    900: '#080E11',
                },
                secondary: {
                    DEFAULT: '#E9C46A', // Sandy Gold
                    light: '#F4E4B5',
                    dark: '#D4A324',
                },
                accent: {
                    DEFAULT: '#E76F51', // Terracotta
                    light: '#F4A261',   // Sandy Orange
                    dark: '#C84C2E',
                },
                background: {
                    DEFAULT: '#F4F1DE', // Warm Off-White/Sand
                    paper: '#FFFFFF',
                    subtle: '#EAE7D6',
                },
                text: {
                    DEFAULT: '#264653', // Deep Green for text
                    muted: '#6B7280',
                    light: '#9CA3AF',
                    inverse: '#FFFFFF',
                },
                // Semantic Colors
                success: '#2A9D8F',
                warning: '#E9C46A',
                danger: '#E76F51',
                info: '#264653',
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            boxShadow: {
                'editorial': '4px 4px 0px 0px rgba(38, 70, 83, 0.1)',
                'editorial-hover': '6px 6px 0px 0px rgba(38, 70, 83, 0.2)',
            },
            borderRadius: {
                'editorial': '0.5rem',
            }
        },
    },
    plugins: [],
}
