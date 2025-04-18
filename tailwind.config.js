/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  // darkMode: ['class', '[data-mode="dark"]'],
  plugins: [require("tailwindcss"), require("daisyui")],
  theme: {
    extend: {
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
      },
      screens: {
        "max-500": "500px",
        "min-500": "500px",
        "min-480": "480px",
        "min-450": "450px",
        "min-420": "420px",
        "min-400": "400px",
        "min-350": "350px",
      },
    },
  },
  daisyui: {
    themes: [],
    base: false,
    styled: true,
    utils: true,
    logs: false,
    // darkTheme: "dark",
    // themeRoot: ":root",
  },
};
