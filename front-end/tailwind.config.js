/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './dist/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './*.html',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkGunmetal: {
          100: '#1B2429',
          200: '#1E1F20', //text-dark
          300: '#010101',
          400: '#191D31',
          500: '#131313',
          600: '#202224',
        },
        antiFlashWhite: {
          100: '#FFFFFF',
          200: '#F2F2F2',
          300: '#F3F3F3',
          400: '#F4F4F4',
          500: '#F7F9FA',
          600: '#777E90',
          700: '#D8D8D8',
          800: '#cfdbd599',
          900: '#F3F3F7',
        },
        lava: {
          100: '#D91118',
          200: '#F00',
          300: '#FFF1F1',
        },
        cetaceanBlue: {
          100: '#131444',
          200: '#388DF6',
          300: '#D9E0EE',
          400: '#F0F5FD',
          500: '#080134',
          600: '#EAEBF1',
        },
        aztecGold: {
          100: '#C59F59',
        },
        neutral: {
          100: '#E7E7E7',
          200: '#E9EAF0',
          300: '#B9B9B9',
          400: '#8F92A1', //text-light
          500: '#474553',
          600: '#979797',
          700: '#EDEDED',
          800: '#CECECE',
          900: '#93989A',
          1000: '#E6E8EC',
          1100: '#6B6785',
          1200: '#CFCECD',
        },
        green: {
          100: '#2AB277',
        },
      },
      boxShadow: {
        'inner-xs':
          'inset 2px 2px 5px 0px rgba(189, 200, 223, .7), inset -2px -2px 2px 0px rgba(255,255,255,.7)',
        'inner-sm':
          'inset 4px 4px 9px 0px rgba(0, 0, 0, 0.25), inset -4px -4px 9px 0px rgba(255, 255, 255, 0.25)',
        'inner-md':
          'inset 7px 7px 15px 0px rgba(189, 200, 223, .7), inset -7px -7px 15px 0px rgba(255,255,255,.7)',
        'inner-lg':
          'inset 13px 13px 26px 0px rgba(189, 200, 223, .7), inset -13px -13px 26px 0px rgba(255,255,255,.7)',
        'inner-xl':
          '5.220000267028809px 5.220000267028809px 10.440000534057617px 0px rgba(0, 0, 0, 0.25) inset, -5.220000267028809px -5.220000267028809px 10.440000534057617px 0px rgba(255, 255, 255, 0.25) inset',
        'outline-xs':
          '2px 2px 5px 0px rgba(189, 200, 223, .7), -2px -2px 5px 0px rgba(255,255,255,.7)',
        'outline-sm':
          '7px 7px 15px 0px rgba(189, 200, 223, .7), -7px -7px 15px 0px rgba(255,255,255,.7)',
        'outline-md':
          '13px 13px 26px 0px rgba(189, 200, 223, .7), -13px -13px 26px 0px rgba(255,255,255,.7)',
        'outer-lg':
          '0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.10);',
        'button-hover':
          '10px 10px 20px 0px rgba(0, 0, 0, 0.25) inset, -10px -10px 20px 0px rgba(255, 255, 255, 0.25) inset',
        footer: '0px 8px 24px -0.75px rgba(0, 0, 0, 0.04)',
        'outline-main-card':
          ' 1px 1px 2px 1px rgba(189, 200, 223, 0.70), -1px -1px 2px 1px rgba(255, 255, 255, 0.70)',
        'info-modal': '0px 4px 100px 0px rgba(147, 152, 154, 0.40)',
        'outline-mint-card': '3px 3px 7px 0px rgba(189, 200, 223, 0.70)',
        'outline-spot-selection': '0px 2px 4px 0px #B9B9B9',
      },

      fontFamily: {
        spAdvRegular: ['spAdvRegular', 'sans-serif'],
        spAdvSemiBold: ['spAdvSemiBold', 'sans-serif'],
        spAdvBold: ['spAdvBold', 'sans-serif'],
      },
      fontSize: {
        xs: '0.75rem', //12px
        sm: '0.875rem', //14px
        base: '1rem', //16px
        lg: '1.125rem', //18px
        xl: '1.5rem', //24px
        h2: '2rem', //32px
        h1: '2.625rem', //42px
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.01em',
        wider: '0.02em',
        widest: '0.4em',
      },
      lineHeight: {
        none: '1',
        tighter: '1.125',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
        3: '.75rem',
        4: '1rem',
        5: '1.2rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
      },
      borderRadius: {
        '4xl': '32px',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
