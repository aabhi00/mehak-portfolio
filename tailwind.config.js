/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#faf7f2",
        brown: "#2d2416",
        terracotta: "#c9956a",
        sage: "#3d6b42",
        mutedBlue: "#3d5a8a",
        cardBorder: "#e8d8c8",
      },
    },
  },
  plugins: [],
};