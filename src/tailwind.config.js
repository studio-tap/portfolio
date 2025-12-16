/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    screens: {
      'sp': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
    extend: {
      fontSize: {
        'xs': '0.75rem', // 12px
        's': '0.875rem', // 14px
        'm': '1rem', // 16px
        'l': '1.125rem', // 18px
        'xl': '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
      },
      letterSpacing: {
        none: '0em',
        tight: '0.025em',
        normal: '0.05em',
        wide: '0.1em',
        wider: '0.2em',
        full: '1em', // 1文字分
      },
      lineHeight: {
        none: 1,
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2,
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        black: '#000000',
        // ライトモード/ダークモードの基本色
        background: {
          light: '#FFFFFF',
          dark: '#1F1F1F',
        },
        foreground: {
          light: '#000000',
          dark: '#BFBFBF',
        },
        // テーマカラー
        orange: {
          DEFAULT: '#FFAA55',
          bg: '#FFD5AA',
          focus: '#FFC68A',
        },
        navy: {
          DEFAULT: '#5599EE',
          bg: '#AACCFF',
          focus: '#88B8FF',
        },
        // その他
        inactive: '#9ca3af', // 非アクティブアイコン
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            p: {
              fontSize: theme('fontSize.s'),
              lineHeight: theme('lineHeight.normal'),
              letterSpacing: theme('letterSpacing.tight'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addComponents, matchUtilities, theme }) {
      // │▌`hover-opacity-{value}` のような動的なユーティリティを作る設定
      matchUtilities(
        {
          'hover-opacity': (value) => ({
            'transition': 'opacity',
            '&:hover': {
              opacity: value,
            },
          }),
        },
        {
          values: {
            weak: '0.9',
            medium: '0.7',
            strong: '0.5',
          },
        }
      );

      // │▌`.link-base` のような再利用可能なコンポーネントクラスを作る設定
      addComponents({
        '.link-base': {
          'fontWeight': theme('fontWeight.medium'),
          'color': theme('colors.blue.400'),
          '&:hover': {
            textDecoration: 'underline',
            color: theme('colors.blue.300'),
          },
        },
      });
    }),
  ],
};
