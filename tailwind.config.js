const { nextui } = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|dropdown|input|modal|progress|table|ripple|spinner|menu|divider|popover|checkbox|spacer).js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#121212",
          },
        },
      },
    }),
  ],
};
