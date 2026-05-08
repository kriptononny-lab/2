import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#E8A825",
          light: "#F5C542",
          dark: "#C48B1A",
        },
        dark: {
          DEFAULT: "#141414",
          section: "#1C1C1C",
          card: "#242424",
        },
      },
      fontFamily: {
        heading: ["Oswald", "sans-serif"],
        body: ["Source Sans 3", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "word-in": "wordIn 0.7s cubic-bezier(0.2,0.7,0.3,1.1) forwards",
        marquee: "marquee 30s linear infinite",
        breathe: "breathe 4s ease-in-out infinite",
        "city-pulse": "cityPulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        wordIn: {
          "0%": { opacity: "0", transform: "translateY(40px)", filter: "blur(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
        },
        cityPulse: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.4)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
