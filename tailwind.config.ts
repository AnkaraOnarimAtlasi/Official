import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: 'var(--atlas-paper)',
          light: 'var(--atlas-paper-light)',
          deep: 'var(--atlas-paper-deep)',
        },
        ink: {
          DEFAULT: 'var(--atlas-ink)',
          muted: 'var(--atlas-muted)',
          soft: 'var(--atlas-soft)',
        },
        border: {
          DEFAULT: 'var(--atlas-border)',
          strong: 'var(--atlas-border-strong)',
        },
        layer: {
          paper: 'var(--layer-paper-arts)',
          object: 'var(--layer-object-repair)',
          craft: 'var(--layer-traditional-crafts)',
          metal: 'var(--layer-metal-wood)',
        },
      },
      fontFamily: {
        display:  ['var(--font-display)', 'Georgia', 'serif'],
        sans:     ['var(--font-sans)', 'system-ui', 'sans-serif'],
        hand:     ['var(--font-hand)', 'cursive'],
        handcaps: ['Handcaps', 'cursive'],
        poppins:  ['var(--font-poppins)', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '-0.02em',
        archive: '0.12em',
      },
      boxShadow: {
        paper: '0 1px 0 rgba(20,20,20,0.03), 0 18px 36px -24px rgba(20,20,20,0.18)',
        sheet:
          '0 1px 0 rgba(20,20,20,0.05), 0 12px 24px -12px rgba(20,20,20,0.10), 0 32px 60px -30px rgba(20,20,20,0.18)',
      },
      maxWidth: {
        prose: '68ch',
        layout: '78rem',
      },
      transitionTimingFunction: {
        atlas: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
