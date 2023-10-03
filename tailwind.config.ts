import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: {
        //   100: "#658864",
        //   200: "#B7B78A",
        //   300: "#fdf6fd",
        // },
        // accent: {
        //   100: "#bc6c25",
        //   200: "#ecd79b",
        // },
        // text: {
        //   100: "#292524",
        //   200: "#78716c",
        // },
        // bg: {
        //   100: "#DDDDDD",
        //   200: "#EEEEEE",
        //   300: "#d1d1d1",
        // },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
