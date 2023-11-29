/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  prefix: "tw-",
  theme: {
    colors: {
      'custom_blue': '#009DDF',
      'custom_light_blue': '#28A4DA',
      'white': '#FFFFFF',
      'custom_dark_red':'#8A0000',
      'custom_light_red':'#DA2828',
      'custom_white':'#FFF0F0',
      'custom_gray':'#8B8B8B'

    },
    extend: {},
  },
  plugins: [],
}

