import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'verde-claro': '#a8e0a4',
        'celeste-claro': '#b4d9ea',
        'naranja-claro': '#f7b04f',
        'marron-claristo': '#d8c5a8',
      },
      backgroundImage: {
        'verde-celeste': 'linear-gradient(to bottom, #a8e0a4, #b4d9ea)',
        'naranja-celeste': 'linear-gradient(to bottom, #f7b04f, #a1c4fd)',
        'marron-celeste': 'linear-gradient(to bottom, #d8c5a8, #b4d9ea)',
        'verde-naranja': 'linear-gradient(to bottom, #9bca5a, #f7b04f)',
      },
    },
  },
  plugins: [],
};
export default config;
