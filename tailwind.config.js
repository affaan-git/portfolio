module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'background-light': "#FFFFFF",
        'background-dark': "#121212",
        'dark-muted': "#243447"
      }
    },
  },
  plugins: [],
};