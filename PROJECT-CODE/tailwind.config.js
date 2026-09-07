/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary, #1FA97D)",
          dark: "var(--color-primary-dark, #178964)",
          tint: "var(--color-primary-tint, #E8F7F1)",
        },
        accent: {
          pink: "var(--color-accent-pink, #FDEAF0)",
          "pink-text": "var(--color-accent-pink-text, #E8577E)",
          yellow: "var(--color-accent-yellow, #FFF6DD)",
          "yellow-text": "var(--color-accent-yellow-text, #E8A93A)",
          lavender: "var(--color-accent-lavender, #EDEBFB)",
          "lavender-text": "var(--color-accent-lavender-text, #6C63C7)",
          lightblue: "var(--color-accent-lightblue, #E7F1FE)",
          "lightblue-text": "var(--color-accent-lightblue-text, #3E8EDE)",
        },
        background: "var(--color-background, #F4F4F4)",
        surface: "var(--color-surface, #FFFFFF)",
        border: "var(--color-border, #ECECEC)",
        text: {
          primary: "var(--color-text-primary, #1B1B1B)",
          secondary: "var(--color-text-secondary, #6B6B6B)",
          placeholder: "var(--color-text-placeholder, #A6A6A6)",
        },
        success: {
          DEFAULT: "var(--color-success, #1FA97D)",
        },
        warning: {
          DEFAULT: "var(--color-warning, #F5A623)",
        },
        error: {
          DEFAULT: "var(--color-error, #E8577E)",
          dark: "var(--color-error-dark, #D64545)",
        },
      },
      borderRadius: {
        card: "16px",
        btn: "16px",
      },
      fontFamily: {
        heading: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
