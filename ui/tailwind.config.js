module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
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
      jumbo: {
        50: "#f5f5f6",
        100: "#e6e6e7",
        200: "#cfcfd2",
        300: "#adadb3",
        400: "#84848c",
        500: "#71717a",
        600: "#5a5a60",
        700: "#4d4c52",
        800: "#434347",
        900: "#3c3b3e",
        950: "#252527",
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
      0: "0rem",
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
    fontWeight: {
      thin: "100",
      hairline: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      "extra-bold": "800",
      black: "900",
    },
    extend: {},
  },
};
