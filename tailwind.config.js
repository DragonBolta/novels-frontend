/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '4k': '3840px',
        // => @media (min-width: 3840px) { ... }
      },
    },
  },
  plugins: [
  ],
}

