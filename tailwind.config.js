/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        novo: {
          navy: '#00205b', // Official Novo Nordisk Deep Navy
          blue: '#004b87', // Clinical Deep Blue
          sky: '#0072ce',
          teal: '#00a3e0',
          accent: '#059669'
        },
        pharma: {
          canvas: '#f8fafc',
          surface: '#ffffff',
          card: '#ffffff',
          border: '#e2e8f0',
          borderSubtle: '#f1f5f9',
          heading: '#0f172a',
          body: '#334155',
          muted: '#64748b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'pharma-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'pharma-md': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'pharma-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
