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
          deep: '#060d18',
          dark: '#091422',
          soft: '#172f4d',
          line: '#22375a',
        },
        gold: {
          DEFAULT: '#c9a45c',
          light: '#e2c780',
          deep: '#a07c37',
          // Único tom de dourado legível como TEXTO sobre fundo claro:
          // 5,4:1 no branco · 4,9:1 no offwhite · 4,6:1 no parchment.
          // `gold` puro dá 2,35:1 — só serve para filete, ícone e superfície.
          ink: '#7f673a',
          pale: '#f2e4c4',
        },
        offwhite: '#f7f5f0',
        parchment: '#efece3',
        // 6,0:1 no branco · 5,5:1 no offwhite · 5,1:1 no parchment.
        muted: '#5b6472',
      },
      fontFamily: {
        serif: ['var(--font-heading)', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['var(--font-body)', 'Arial', 'Helvetica', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 30px rgba(15,31,51,0.06)',
        heavy: '0 18px 45px rgba(15,31,51,0.16)',
        lift: '0 24px 60px -20px rgba(15,31,51,0.35)',
        glow: '0 0 0 1px rgba(201,164,92,0.35), 0 18px 40px -18px rgba(201,164,92,0.5)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      maxWidth: {
        container: '1120px',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(3%, -4%, 0) scale(1.06)' },
          '66%': { transform: 'translate3d(-3%, 3%, 0) scale(0.96)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        sheen: {
          from: { transform: 'translateX(-120%) skewX(-18deg)' },
          to: { transform: 'translateX(240%) skewX(-18deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '70%': { transform: 'scale(1.9)', opacity: '0' },
          '100%': { transform: 'scale(1.9)', opacity: '0' },
        },
        'scroll-cue': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '35%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
        'text-rotate': {
          '0%, 26%': { opacity: '0', transform: 'translateY(0.35em)' },
          '32%, 88%': { opacity: '1', transform: 'none' },
          '94%, 100%': { opacity: '0', transform: 'translateY(-0.35em)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 0.9s ease-out both',
        drift: 'drift 26s ease-in-out infinite',
        marquee: 'marquee 45s linear infinite',
        sheen: 'sheen 0.9s cubic-bezier(0.22,1,0.36,1)',
        'pulse-ring': 'pulse-ring 2.6s cubic-bezier(0.22,1,0.36,1) infinite',
        'scroll-cue': 'scroll-cue 2.2s ease-in-out infinite',
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
