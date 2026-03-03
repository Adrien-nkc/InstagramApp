/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "move-up": {
          "0%": { transform: "translateY(50%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 2s ease-in-out",
        "move-up": "move-up 2s ease-in-out",
        "button-pop": "fade-in 2s ease-in-out, move-up 2s ease-in-out",
      },
    },
  },
  plugins: [],
}
