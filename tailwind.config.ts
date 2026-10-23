import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: "#06060b",
          900: "#0b0b14",
          800: "#121222",
          700: "#1d1d35",
        },
        dragon: {
          violet: "#a855f7",
          magenta: "#ed00ff",
          aqua: "#00fbff",
          teal: "#2dd4bf",
        },
      },
      fontFamily: {
        sans: ["var(--font-space)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "dragon-gradient": "linear-gradient(135deg, #00fbff 0%, #a855f7 50%, #ed00ff 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
