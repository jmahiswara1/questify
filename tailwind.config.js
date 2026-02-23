/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "primary": "#0D9488",
                "primary-light": "#14b8a6",
                "primary-dark": "#0f766e",
                "text-main": "#18181B",
                "text-muted": "#52525b",
                "text-silver": "#A1A1AA",
                "bg-soft": "#F3F4F6",
                "surface-light": "#ffffff",
                "zinc-dark": "#18181B",
                "zinc-medium": "#52525b",
                "silver": "#A1A1AA",
                "glass-bg": "rgba(255, 255, 255, 0.7)",
                "glass-border": "rgba(255, 255, 255, 0.5)",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "sans": ["Inter", "sans-serif"],
                "body": ["Inter", "sans-serif"],
            },
            backgroundImage: {
                'blob-1': 'radial-gradient(circle, rgba(13, 148, 136, 0.15) 0%, rgba(0,0,0,0) 70%)',
                'blob-2': 'radial-gradient(circle, rgba(161, 161, 170, 0.2) 0%, rgba(0,0,0,0) 70%)',
                'soft-gradient': 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
            },
            keyframes: {
                shine: {
                    '0%': { transform: 'translateX(-100%)', opacity: '1' },
                    '100%': { transform: 'translateX(100%)', opacity: '1' },
                }
            },
            animation: {
                shine: 'shine 1s ease-in-out',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                'glow': '0 0 20px rgba(13, 148, 136, 0.3)'
            }
        },
    },
    plugins: [],
}
