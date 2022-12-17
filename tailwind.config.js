/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'main-100': '#E7ECEC',
        'main-200': '#DDE4E4',
        'main-300': '#CED9D9',
        'main-400': '#C0D8D8',
        'main-500': '#0E8080',
        'overlay': 'rgba(0,0,0,0.35)'
      },
      colors: {
        'main-100': '#E7ECEC',
        'main-200': '#DDE4E4',
        'main-300': '#CED9D9',
        'main-400': '#C0D8D8',
        'main-500': '#0E8080'
      },
      keyframes: {
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateX(-500px)",
            transform: "translateX(-500px)"
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)"
          }
        },
        "slide-left": {
          "0%": {
            "-webkit-transform": "translateX(500px)",
            transform: "translateX(500px)"
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)"
          }
        },
        "slide-left2": {
          "0%": {
            "-webkit-transform": "translateX(500px)",
            transform: "translateX(500px)"
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)"
          }
        },
        "slide-right2": {
          "0%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)"
          },
          "100%": {
            "-webkit-transform": "translateX(500px)",
            transform: "translateX(500px)"
          }
        },
        "rotate-center": {
          "0%": {
            "-webkit-transform": "rotate(0)",
            transform: "rotate(0)"
          },
          "100%": {
            "-webkit-transform": "rotate(360deg)",
            transform: "rotate(360deg)"
          }
        },
        "rotate-center-pause": {
          "0%": {
            "-webkit-transform": "rotate(0)",
            transform: "rotate(0)",
            "border-radius": "9999px"
          },
          "100%": {
            "-webkit-transform": "rotate(360deg)",
            transform: "rotate(360deg)"
          }
        },
        "scale-up": {
          "0%": {
            "-webkit-transform": "scale(0)",
            transform: "scale(0)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)"
          }
        },
        "scale-up-image": {
          "0%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
          "100%": {
            "-webkit-transform": "scale(1.1)",
            transform: "scale(1.1)"
          }
        },
        "scale-down-image": {
          "0%": {
            "-webkit-transform": "scale(1.1)",
            transform: "scale(1.1)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)"
          }
        }
      },
      animation: {
        "slide-right": "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-left": "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-left2": "slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-right2": "slide-right2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "rotate-center": "rotate-center 10s linear infinite",
        "rotate-center-pause": "rotate-center-pause 0.6s linear 1 both",
        "scale-up": "scale-up 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s both",
        "scale-up-image": "scale-up-image cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s both",
        "scale-down-image": "scale-down-image cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s both",
      },
      flex: {
        "4": "4 4 0%",
        "6": "6 6 0%",
        "3": "3 3 0%",
        "7": "7 7 0%",
      }
    },
    screens: {
      "1600": "1600px"
    }
  },
  plugins: [],
}
