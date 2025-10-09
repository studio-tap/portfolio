/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        'xs': '0.75rem',    // 12px
        's': '0.875rem',   // 14px
        'm': '1rem',       // 16px
        'l': '1.125rem',   // 18px
        'xl': '1.25rem',   // 20px
        '2xl': '1.5rem',   // 24px
        '3xl': '1.875rem', // 30px
      },
      letterSpacing: {
        'none': '0em',
        'tight': '0.025em',
        'normal': '0.05em',
        'wide': '0.1em',
        'wider': '0.2em',
        'full': '1em', // 1文字分
      },
      lineHeight: {
        'none': 1,
        'tight': 1.25,
        'normal': 1.5,
        'relaxed': 1.75,
        'loose': 2,
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        black: '#000000',
        // ライトモード/ダークモードの基本色
        background: {
          light: '#FFFFFF',
          dark: '#0F0F0F',
        },
        foreground: {
          light: '#000000',
          dark: '#BFBFBF',
        },
        // テーマカラー
        orange: {
          DEFAULT: '#f97316', // アイコンなどで使用
          bg: '#fed7aa',      // トグルOFF時の背景
          focus: '#fdba74',   // フォーカスリング
        },
        navy: {
          DEFAULT: '#6366f1', // アイコン、トグルON時の背景
          focus: '#a5b4fc',   // フォーカスリング
        },
        // その他
        inactive: '#9ca3af', // 非アクティブアイコン
      },
    },
  },
  plugins: [],
}