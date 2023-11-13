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
      keyframes: {
        fadeInUp: {
          '0%': { transform: 'translateY(20%)', opacity: '0' },
          '100%': { transform: 'translateY(0%)', opacity: '1' }
        },
        fadeInUpTitle: {
          '0%': { transform: 'translateY(60%)', opacity: '0', 'animation-timing-function': 'cubic-bezier(0.175, 0.885, 0.32, 1.575)' },
          '100%': { transform: 'translateY(0%)', opacity: '1' }
        },
        widthChangeIncreaseBox: {
          '0%': { width: '4rem', 'animation-timing-function': 'ease-in-out' },
          '100%': { width: '18rem' }
        },
        widthChangeIncreaseText: {
          '0%': { width: '0rem', 'animation-timing-function': 'ease-in-out' },
          '100%': { width: '14rem' }
        },
        expandFull: {
          '0%': { height:'0px' },
          '100%': { height:'836px' }
        },
        expandMin: {
          '0%': { height:'0px' },
          '100%': { height:'1377px' }
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.45s',
        fadeInUpTitle: 'fadeInUpTitle 0.7s',
        widthChangeIncreaseBox: 'widthChangeIncreaseBox 0.5s',
        widthChangeIncreaseText: 'widthChangeIncreaseText 0.5s',
        expandFull: 'expandFull 0.7s',
        expandMin: 'expandMin 1s',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}

