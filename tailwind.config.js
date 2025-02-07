/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,jsx}', // Adjust to match your file extensions
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(120%)",
            transform: "translateX(120%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
        }, 
        "grow-left": {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "75%",
          },
        },
        "growLeft": {
          "0%": { 
            overflow:"hidden",
            width: "0%",
          },
          "100%": { 
            overflow:"hidden",
            width: "100%",
          },
        }, 
        "slide-inleft": {
          "0%": {
            "-webkit-transform": "translateX(-120%)",
            transform: "translateX(-120%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
        },
        "slide-inright": {
          "0%": {
            "-webkit-transform": "translateX(120%)",
            transform: "translateX(120%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
        },
        "slidetop": {
          "0%": {
            "-webkit-transform": "translateY(120%)",
            transform: "translateY(120%)",
          },
          "100%": {
            "-webkit-transform": "translateY(0%)",
            transform: "translateY(0%)",
          },
        },
        'fadeIn': {
          '0%': {
            opacity: 0,
          },        
          '100%': {
            opacity: 1,
          },
        },
        'fadeOut': {
          '0%': {
            opacity: 1,
          },        
          '100%': {
            opacity: 0,
          },
        },
        'fadeInNav': {
          '0%': {
            opacity: 0,
          }, 
          '40%': {
            opacity: 0,
          },       
          '100%': {
            opacity: 1,
          },
        }, 
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
        "slide-inleft": "slide-inleft 0.5s ease-out",
        "slide-inright": "slide-inright 0.5s ease-out",
        "slide-tops": "slidetop 0.5s ease-out",
        'spin-slow': 'spin 3s linear infinite',
        'fadeInw': 'fadeInNav 1s',
        'fadeOut': 'fadeOut 1s',
        'growleft': 'grow-left 0.5s ease-out',
        'growLeft': 'growLeft 0.5s ease-out', 
        'fadeIn': 'fadeIn 1s',
        'fadeInfast': 'fadeIn 0.3s'
      },
    },
  },
  plugins: [
    // ...
    require('tailwind-scrollbar'),
  ],
}

