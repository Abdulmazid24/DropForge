/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            },
            colors: {
                primary: '#0F172A', // Deep Navy
                secondary: '#1E293B', // Slate
                accent: '#38BDF8', // Sky Blue (Neon-ish)
                'accent-purple': '#818CF8', // Indigo
                'dark-bg': '#020617', // Very Dark Blue
                'glass-white': 'rgba(255, 255, 255, 0.05)',
                'glass-border': 'rgba(255, 255, 255, 0.1)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #0F172A 0deg, #1E293B 180deg, #0F172A 360deg)',
            }
        },
    },
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        themes: ["night", "dark"], // Force dark theme vibes
    },
}
