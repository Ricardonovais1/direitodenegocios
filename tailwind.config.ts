import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0f1f33',
          dark: '#091422',
          soft: '#172f4d',
        },
        gold: {
          DEFAULT: '#c9a45c',
          light: '#e2c780',
        },
        offwhite: '#f7f5f0',
        muted: '#667085',
      },
      fontFamily: {
        serif: ['Georgia', '"Times New Roman"', 'serif'],
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 30px rgba(15,31,51,0.06)',
        heavy: '0 18px 45px rgba(15,31,51,0.16)',
      },
      maxWidth: {
        container: '1120px',
      },
    },
  },
  plugins: [],
}

export default config
