/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        xl: "150px",
      },
      fontFamily: {
        Poppins: ["Poppins", "Roboto"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
