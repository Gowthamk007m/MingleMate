module.exports = {
  content: [
    "./src/**/*/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
 

    // "./public/index.html" /* src folder, for example */,
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
