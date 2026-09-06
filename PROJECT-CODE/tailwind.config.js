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
          DEFAULT: "var(--color-primary, #B5502E)",
          dark: "var(--color-primary-dark, #8F3E22)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary, #7A6A3F)",
        },
        accent: {
          DEFAULT: "var(--color-accent, #2F5D50)",
        },
        background: "var(--color-background, #FBF7F1)",
        surface: "var(--color-surface, #FFFFFF)",
        border: "var(--color-border, #E4DCCF)",
        text: {
          primary: "var(--color-text-primary, #2B2420)",
          secondary: "var(--color-text-secondary, #6B6055)",
        },
        success: {
          DEFAULT: "var(--color-success, #3D7A4C)",
        },
        warning: {
          DEFAULT: "var(--color-warning, #C08A1E)",
        },
        error: {
          DEFAULT: "var(--color-error, #B23A34)",
        },
        info: {
          DEFAULT: "var(--color-info, #2E5F8A)",
        },
        neutral: {
          50: "var(--color-neutral-50, #FAFAF9)",
          100: "var(--color-neutral-100, #F5F4F0)",
          200: "var(--color-neutral-200, #E8E5DF)",
          300: "var(--color-neutral-300, #D7D2C7)",
          400: "var(--color-neutral-400, #A8A196)",
          500: "var(--color-neutral-500, #7E766B)",
          600: "var(--color-neutral-600, #5E574E)",
          700: "var(--color-neutral-700, #443E37)",
          800: "var(--color-neutral-800, #2E2A25)",
          900: "var(--color-neutral-900, #1D1A17)",
        },
      },
      fontFamily: {
        heading: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        serif: ["Fraunces", "serif"],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
        "4xl": ["36px", { lineHeight: "40px" }],
        "5xl": ["48px", { lineHeight: "1.15" }],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        6: "24px",
        8: "32px",
        12: "48px",
        16: "64px",
        24: "96px",
      },
      borderRadius: {
        sm: "var(--radius-sm, 6px)",
        md: "var(--radius-md, 10px)",
        lg: "var(--radius-lg, 16px)",
        pill: "var(--radius-pill, 999px)",
        full: "var(--radius-pill, 999px)",
      },
      boxShadow: {
        sm: "var(--shadow-sm, 0 1px 2px 0 rgba(43, 36, 32, 0.05))",
        md: "var(--shadow-md, 0 4px 6px -1px rgba(43, 36, 32, 0.08), 0 2px 4px -2px rgba(43, 36, 32, 0.05))",
        lg: "var(--shadow-lg, 0 10px 15px -3px rgba(43, 36, 32, 0.08), 0 4px 6px -4px rgba(43, 36, 32, 0.05))",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
