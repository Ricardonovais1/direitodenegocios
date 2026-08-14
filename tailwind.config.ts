import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

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
        serif: ['var(--font-heading)', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['var(--font-body)', 'Arial', 'Helvetica', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 30px rgba(15,31,51,0.06)',
        heavy: '0 18px 45px rgba(15,31,51,0.16)',
      },
      maxWidth: {
        container: '1120px',
      },
      typography: {
        navy: {
          css: {
            '--tw-prose-body': '#3c4757',
            '--tw-prose-headings': '#0f1f33',
            '--tw-prose-lead': '#3c4757',
            '--tw-prose-links': '#0f1f33',
            '--tw-prose-bold': '#0f1f33',
            '--tw-prose-bullets': '#c9a45c',
            '--tw-prose-quotes': '#0f1f33',
            '--tw-prose-quote-borders': '#c9a45c',
            '--tw-prose-captions': '#667085',
            'h1, h2, h3, h4': { fontFamily: 'var(--font-heading)', fontWeight: '700' },
            a: { textDecoration: 'underline', textUnderlineOffset: '2px', fontWeight: '600' },
            'a:hover': { color: '#c9a45c' },
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
