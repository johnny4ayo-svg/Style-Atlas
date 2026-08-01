import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        obsidian: "#080807",
        charcoal: {
          DEFAULT: "#12110F",
        },
        ivory: {
          DEFAULT: "#F7F2E9",
          soft: "#EFE7DB",
        },
        gold: {
          DEFAULT: "#C69A52",
        },
        bronze: {
          DEFAULT: "#8A6032",
        },
        emerald: {
          DEFAULT: "#174C3C",
        },
        stone: {
          DEFAULT: "#B8B0A5",
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
