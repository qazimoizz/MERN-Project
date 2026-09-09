export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shopco: {
          black: "#000000",
          offwhite: "#F2F0F1",
          lightgrey: "#F0F0F0",
          border: "rgba(0, 0, 0, 0.1)",
          muted: "rgba(0, 0, 0, 0.6)",
          discount: "#FF3333",
          star: "#FFC633"
        }
      },
      fontFamily: {
        integral: ['"Integral CF"', 'system-ui', '-apple-system', 'sans-serif'],
        satoshi: ['Satoshi', 'system-ui', '-apple-system', 'sans-serif']
      }
    },
  },
  plugins: [],
}

