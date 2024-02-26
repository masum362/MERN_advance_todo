/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      bgColor: "rgb(var(--color-bg) / <alpha-value>)",
      primaryColor: "rgb(var(--color-primary) / <alpha-value>)",
      secondaryColor: "rgb(var(--color-secondary) / <alpha-value>)",
      blueColor: "rgb(var(--color-blue) / <alpha-value>)",
      whiteColor: "rgb(var(--color-white) / <alpha-value>)",
      dangerColor: "#FF0000",
      lowPriority:"rgb(var(--color-low) / <alpha-value>)",
      mediumPriority:"rgb(var(--color-medium) / <alpha-value>)",
      highPriority:"rgb(var(--color-high) / <alpha-value>)",
      ascentColor: {
        1: "rgb(var(--color-ascent1) / <alpha-value>)",
        2: "rgb(var(--color-ascent2) / <alpha-value>)",
      },
    },
    screens: {
      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
