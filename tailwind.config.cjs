// tailwind.config.cjs
const flowbitePlugin = require('flowbite/plugin');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,svelte,ts,jsx,tsx}",
    "./pages/**/*.{html,js,svelte,ts,jsx,tsx}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}" // Add this line for Flowbite-Svelte
  ],
  darkMode: 'selector', // Enable dark mode via class
  theme: {
    extend: {
      spacing: {
        '98': '25rem',
        '100': '28rem',
        '110': '28.5rem',
        '111': '28.9rem',
        '120': '30rem',
        '122': '31rem',
        '128': '32rem',
        '130': '34rem',
        '134': '35.6rem',
        '135': '39.4rem',
        '160': '40rem',
        '168': '44rem',
        '165': '43rem',
        '170': '43.5rem',
        '192': '48rem',
        '224': '56rem',
        '256': '64rem',
        '260': '75rem',
        '300': '94rem',
        '301': '97.5rem'
      },
      width: {
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
        '224': '56rem',
        '256': '64rem',
      },
      height: {
        '128': '32rem',
        '160': '40rem',
        '170': '45rem',
        '192': '48rem',
        '224': '56rem',
        '256': '64rem',
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '11rem',
        '12xl': '20rem',
        '15xl': '40rem',
        '20xl': '56rem',
        '22xl': '64rem',
      },
      colors: {
        // flowbite-svelte primary color palette
        primary: {
          50: '#FFF5F2',
          100: '#FFF1EE',
          200: '#FFE4DE',
          300: '#FFD5CC',
          400: '#FFBCAD',
          500: '#FE795D',
          600: '#EF562F',
          700: '#EB4F27',
          800: '#CC4522',
          900: '#A5371B'
        }
      },
    },
  },
  plugins: [
    flowbitePlugin // Add Flowbite plugin to the plugins array
  ],
};
