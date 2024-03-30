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
        primary: '#484848',
        secondary: '#707070',
        accent1: '#34E7BC',
        accent2: '#75E8CC',
        accent3: 'rgba(163, 239, 220, 0.87)',
        shade: 'rgba(0, 0, 0, 0.1)',
        shade2: 'rgba(255, 255, 255, 0.6)',
        shade3: 'rgba(255, 255, 255, 0.9)',
      },
      backgroundImage: {
        hero: "url('./public/background_hero.png')",
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
