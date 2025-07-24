/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#BA9B8A', // 清新蓝紫色
        secondary: '#F0F4F8', // 极淡蓝灰
        accent: '#D4E4F7', // 淡蓝色
        soft: '#E8F2FF', // 浅蓝白
        background: '#FDFEFF', // 纯净白
        text: {
          primary: '#2D3748', // 深灰蓝
          secondary: '#4A5568', // 中灰蓝
          light: '#718096', // 浅灰蓝
          wedding: '#BA9B8A', // 黄褐色
        },
      },
      fontFamily: {
        sans: [
          'WeddingFont',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Microsoft YaHei',
          '微软雅黑',
          'sans-serif',
        ],
        wedding: ['WeddingFont', 'cursive'],
        english: ['Pacifico', 'cursive'],
        chinese: ['WeddingFont', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
        full: '9999px',
        button: '4px',
      },
    },
  },
  plugins: [],
};
