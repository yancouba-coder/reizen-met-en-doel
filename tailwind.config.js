/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Couleur principale (CTA, liens actifs, highlights)
                primary: {
                    DEFAULT: '#E88D30',
                    50: '#FEF5ED',
                    100: '#FDE9D6',
                    200: '#FBD3AD',
                    300: '#F9BD84',
                    400: '#F7A75B',
                    500: '#E88D30',
                    600: '#D67A1F',
                    700: '#A85F18',
                    800: '#7A4511',
                    900: '#4C2B0A',
                    light: '#F4A261',
                    dark: '#C76842',
                },

                // Couleur secondaire (fonds, boutons secondaires)
                secondary: {
                    DEFAULT: '#FDF8F0',
                    light: '#FFFFFF',
                    dark: '#E8DCC3',
                },

                // Couleur d'accent (prix, éléments importants)
                accent: {
                    DEFAULT: '#C76842',
                    light: '#E07A5F',
                    dark: '#A85535',
                },

                // Couleurs de texte
                text: {
                    DEFAULT: '#1A2B3C',
                    light: '#4A5568',
                    lighter: '#718096',
                    inverse: '#FFFFFF',
                },

                // Couleurs de fond
                background: {
                    DEFAULT: '#FFFFFF',
                    light: '#F7FAFC',
                    dark: '#FDF8F0',
                    darker: '#E8DCC3',
                },

                // Couleurs sémantiques (états)
                success: {
                    DEFAULT: '#4A7C59',
                    light: '#68D391',
                    dark: '#2F855A',
                },

                info: {
                    DEFAULT: '#7CB9E8',
                    light: '#90CDF4',
                    dark: '#3182CE',
                },

                warning: {
                    DEFAULT: '#F6AD55',
                    light: '#FBD38D',
                    dark: '#DD6B20',
                },

                danger: {
                    DEFAULT: '#FC8181',
                    light: '#FEB2B2',
                    dark: '#E53E3E',
                },

                // Admin specific colors
                admin: {
                    sidebar: '#1E293B',      // Slate-800
                    hover: '#334155',        // Slate-700
                    active: '#0EA5E9',       // Sky-500
                    danger: '#EF4444',       // Red-500
                    success: '#10B981',      // Green-500
                    warning: '#F59E0B',      // Amber-500
                    background: '#F1F5F9',   // Slate-100
                },
            },

            // Espacements sémantiques (padding, margin, gap)
            spacing: {
                // Espacements de composants
                'button-sm': '0.75rem',      // 12px - padding petit bouton
                'button': '1rem',            // 16px - padding bouton normal
                'button-lg': '1.5rem',       // 24px - padding grand bouton
                'input': '0.75rem',          // 12px - padding input (px-3 py-2)
                'card': '1rem',              // 16px - padding carte
                'card-lg': '1.5rem',         // 24px - padding grande carte
                'section': '5rem',           // 80px - espacement entre sections
                'section-sm': '3rem',        // 48px - petit espacement section
                'container': '1rem',         // 16px - padding container

                // Espacements d'interface
                'header': '1rem',            // 16px - padding header
                'sidebar': '1.5rem',         // 24px - padding sidebar
                'nav-item': '0.75rem',       // 12px - padding item navigation
                'dropdown': '0.5rem',        // 8px - padding dropdown

                // Espacements de layout
                'layout-xs': '0.5rem',       // 8px
                'layout-sm': '1rem',         // 16px
                'layout-md': '1.5rem',       // 24px
                'layout-lg': '2rem',         // 32px
                'layout-xl': '3rem',         // 48px
                'layout-2xl': '4rem',        // 64px
            },

            // Largeurs sémantiques
            width: {
                // Largeurs de composants
                'avatar-sm': '2rem',         // 32px (w-8)
                'avatar': '2.5rem',          // 40px (w-10)
                'avatar-md': '3rem',         // 48px (w-12)
                'avatar-lg': '6rem',         // 96px (w-24)
                'avatar-xl': '8rem',         // 128px (w-32)

                // Largeurs de layout
                'sidebar': '16rem',          // 256px (w-64)
                'sidebar-collapsed': '4rem', // 64px
                'dropdown': '12rem',         // 192px (w-48)
                'dropdown-lg': '16rem',      // 256px
                'modal-sm': '28rem',         // 448px
                'modal': '32rem',            // 512px
                'modal-lg': '48rem',         // 768px
                'modal-xl': '64rem',         // 1024px

                // Largeurs de contenu
                'content-sm': '36rem',       // 576px
                'content': '42rem',          // 672px
                'content-lg': '48rem',       // 768px
                'content-xl': '56rem',       // 896px
            },

            // Hauteurs sémantiques
            height: {
                // Hauteurs de composants
                'avatar-sm': '2rem',         // 32px (h-8)
                'avatar': '2.5rem',          // 40px (h-10)
                'avatar-md': '3rem',         // 48px (h-12)
                'avatar-lg': '6rem',         // 96px (h-24)
                'avatar-xl': '8rem',         // 128px (h-32)

                // Hauteurs d'interface
                'header': '4rem',            // 64px (h-16)
                'header-sm': '3.5rem',       // 56px
                'header-lg': '5rem',         // 80px (h-20)
                'input': '2.5rem',           // 40px (h-10)
                'input-sm': '2rem',          // 32px (h-8)
                'input-lg': '3rem',          // 48px (h-12)
                'button': '2.5rem',          // 40px
                'button-sm': '2rem',         // 32px
                'button-lg': '3rem',         // 48px

                // Hauteurs de layout
                'hero': '32rem',             // 512px
                'hero-sm': '24rem',          // 384px
                'hero-lg': '40rem',          // 640px
                'section': '20rem',          // 320px
                'card': '16rem',             // 256px
                'card-sm': '12rem',          // 192px
                'card-lg': '20rem',          // 320px
            },

            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            },

            container: {
                center: true,
                padding: '1rem',
            }
        },
    },
    plugins: [],
}
