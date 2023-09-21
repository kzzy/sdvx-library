/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'headerbg': "linear-gradient(to right,rgba(30,58,138,0.7),rgba(0,0,0,1),rgba(131,24,67,0.7))",
        'diff-grv-bg': "url('/grv_diff_label_bg.png')"
      },
      brightness: {
        "2": ".02",
        '10': ".10"
      },
      translate: {
        '4/5': "80%"
      },
      width: {
        '128': "48rem"
      },
      height: {
        'expanded-drop': "82vh"
      },
      outlineOffset: {
        '16': "16px"
      }
    },
  },
  plugins: [],
}

