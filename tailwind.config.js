const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./{components,pages}/**/*.js"],
  theme: {
    extend: {
      colors: {
        clementine: "#EF7300",
        tumbleweed: "#D9A876",
        "hawkes-blue": "#C7DDFD",
        asparagus: "#789750",
        goldenrod: "#FFCE70",
        black: "#150703",
        "faded-black": "rgba(21,7,3,0.3)",
        "ecru-white": "#FAF8F3",
        "white-rock": "#E8E0CF",
      },
      height: {
        112: "28rem",
      },
    },
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
      serif: ["EB Garamond", ...defaultTheme.fontFamily.serif],
    },
  },
  variants: {
    fontStyle: ["responsive", "hover"],
  },
};
