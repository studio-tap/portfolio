/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ライトモード/ダークモードの基本色
        background: {
          light: '#ffffff',
          dark: '#0a0a0a',
        },
        foreground: {
          light: '#171717',
          dark: '#ededed',
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