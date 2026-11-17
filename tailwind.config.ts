import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        canvas: { DEFAULT: 'rgb(var(--canvas) / <alpha-value>)', subtle: 'rgb(var(--canvas-subtle) / <alpha-value>)' },
        ink: { DEFAULT: 'rgb(var(--ink) / <alpha-value>)', muted: 'rgb(var(--ink-muted) / <alpha-value>)', faint: 'rgb(var(--ink-faint) / <alpha-value>)' },
        teal: { DEFAULT: 'rgb(var(--teal) / <alpha-value>)', vibrant: 'rgb(var(--teal-vibrant) / <alpha-value>)', deep: 'rgb(var(--teal-deep) / <alpha-value>)', light: 'rgb(var(--teal-light) / <alpha-value>)' },
        amber: { DEFAULT: 'rgb(var(--amber) / <alpha-value>)', subtle: 'rgb(var(--amber-subtle) / <alpha-value>)', dark: 'rgb(var(--amber-dark) / <alpha-value>)' },
        status: { success: 'rgb(var(--success) / <alpha-value>)', alert: 'rgb(var(--alert) / <alpha-value>)' },
        border: 'hsl(var(--border))',
      },
      fontFamily: {
        serif: ['var(--font-dm-serif-display)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
