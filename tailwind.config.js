/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          background: "var(--color-background)",
          text: "var(--color-text)",
        },
      },
    },
    plugins: [],
  }
  