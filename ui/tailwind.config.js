module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  important: true,
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      white: "#ffffff",
      sky: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
        950: "#082f49",
      },
    },
    spacing: {
      1: "1rem",
      2: "1.5rem",
      3: "2rem",
      4: "2.5rem",
      5: "3rem",
      6: "3.5rem",
    },
    padding: {
      1: "1rem",
      2: "1.5rem",
      3: "2rem",
      4: "2.5rem",
      5: "3rem",
      6: "3.5rem",
    },
    fontFamily: {
      ty: [
        "Hiragino Sans GB",
        "Microsoft YaHei",
        "WenQuanYi Micro Hei",
        "sans-serif",
      ],
    },
    borderWidth: {
      0: "0.125rem",
      1: "0.25rem",
      2: "0.375rem",
      3: "0.5rem",
    },
    borderRadius: {
      0: "0.125rem",
      1: "0.25rem",
      2: "0.375rem",
      3: "0.5rem",
      none: "0",
      full: "9999px",
    },
    fontSize: {
      "2xl": [
        "1.5rem",
        {
          lineHeight: "2rem",
          letterSpacing: "-0.01em",
          fontWeight: "500",
        },
      ],
      "3xl": [
        "1.875rem",
        {
          lineHeight: "2.25rem",
          letterSpacing: "-0.02em",
          fontWeight: "700",
        },
      ],
    },
    extends: {},
  },
};
