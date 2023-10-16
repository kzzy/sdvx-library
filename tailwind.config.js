/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        main: '#0A0A0A',
        mainNight: '#050505'
      },
      backgroundColor: {
        'main': '#0A0A0A',
        'mainNight': '#050505'
      },
      backgroundImage: {
        'headerbg': "linear-gradient(to right,rgba(30,58,138,0.7),rgba(0,0,0,1),rgba(131,24,67,0.7))",
        'gradient-radial': 'radial-gradient(ellipse at center, rgba(10,10,10,1) 0%, rgba(164,164,250,0.01) 0%, rgba(10,10,10,1) 100%)',
      },

      brightness: {
        "2": ".02",
        '10': ".10"
      },
      translate: {
        '4/5': "80%"
      },
      width: {
        '192': "48rem",
        '128': "32rem",
        '160': "40rem"
      },
      height: {
        'expanded-drop': "82vh"
      },
      outlineOffset: {
        '16': "16px"
      },
      screens: {
        '1.5xl': '1400px'
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}

