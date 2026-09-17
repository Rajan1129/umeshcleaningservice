/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0B2545', 900: '#06182C', 800: '#0B2545', 700: '#133A6B', 600: '#1D4E89' },
        green: { DEFAULT: '#16A34A', 50: '#F0FDF4', 100: '#DCFCE7', 500: '#22C55E', 600: '#16A34A', 700: '#15803D', 800: '#166534' },
        teal: { DEFAULT: '#16A34A', 50: '#F0FDF4', 100: '#DCFCE7', 500: '#22C55E', 600: '#16A34A', 700: '#15803D', 800: '#166534' },
        aqua: { DEFAULT: '#16A34A', 600: '#15803D', 700: '#166534', 100: '#DCFCE7' },
        mist: '#F4F7FB',
        slateink: '#4A5F72'
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,43,69,.04), 0 12px 32px -12px rgba(11,43,69,.16)',
        lift: '0 2px 4px rgba(11,43,69,.06), 0 24px 48px -20px rgba(11,43,69,.28)'
      },
      borderRadius: { xl2: '1.25rem' },
      maxWidth: { prose2: '68ch' }
    }
  },
  plugins: []
};
