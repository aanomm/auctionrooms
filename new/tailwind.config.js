const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.njk', './src/**/*.md',],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Bebas Neue', ...defaultTheme.fontFamily.sans],
        'atki': ['Atkinson Hyper', ...defaultTheme.fontFamily.sans],
        'rancho': ['Rancho', 'cursive'],
        'bebas': ['Bebas Neue', 'sans-serif'],
      },
      fontWeight: {
        'xlight': 200,
        'xxlight': 100,
      },
      letterSpacing: {
       'ss': '-.03em',
       's': '-.01em',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.75s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
