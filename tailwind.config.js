/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      pri: {
        DEFAULT: '#ED7373',
      },
      sec: {
        DEFAULT: '#FEFAAB',
      },
      ter: {
        DEFAULT: '#D4ECC7',
      },
      black: {
        DEFAULT: '#1B1B1B',
      },
      white: {
        DEFAULT: '#FFFFFF',
      },
      lightGray: {
        DEFAULT: '#262626',
      },
      lighterGray: {
        DEFAULT: '#424242',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  // plugins: [require('daisyui')],
  // daisyui: {
  //   themes: [
  //     {
  //       light: {
  //         ...require('daisyui/src/theming/themes')['light'],
  //         pri: '#FE6285',
  //         sec: '#97AAFF',
  //         ter: '#8BBF9F',
  //         neutral: '#001111',
  //       },
  //     },
  //     {
  //       dark: {
  //         ...require('daisyui/src/theming/themes')['dark'],
  //         pri: '#FE6285',
  //         sec: '#97AAFF',
  //         ter: '#8BBF9F',
  //         neutral: '#181818',
  //       },
  //     },
  //   ],
  //   darkTheme: 'dark', // name of one of the included themes for dark mode
  //   base: true, // applies background color and foreground color for root element by default
  //   styled: true, // include daisyUI colors and design decisions for all components
  //   utils: true, // adds responsive and modifier utility classes
  //   prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
  //   logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  //   themeRoot: ':root', // The element that receives theme color CSS variables
  // },
};
