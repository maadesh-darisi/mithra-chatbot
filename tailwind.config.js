/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        secondary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'bounce': 'bounce 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.secondary.500'),
              '&:hover': {
                color: theme('colors.secondary.600'),
              },
            },
            strong: {
              color: theme('colors.gray.900'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.prose': {
          '& p': {
            marginTop: '0em',
            marginBottom: '0em',
          },
          '& ul': {
            paddingLeft: '0em',
            listStyleType: 'disc',
          },
          '& ol': {
            paddingLeft: '0em',
            listStyleType: 'decimal',
          },
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            marginTop: '1em', // Reduced from 100em to 1em
            marginBottom: '0.5em',
            fontWeight: '600',
            lineHeight: '1.25',
          },
          '& h1': {
            fontSize: '1.5em',
          },
          '& h2': {
            fontSize: '1.25em',
          },
          '& h3': {
            fontSize: '1.125em',
          },
          '& blockquote': {
            paddingLeft: '1em',
            borderLeftWidth: '0.25em',
            borderLeftColor: '#e5e7eb',
            fontStyle: 'italic',
          },
          '& code': {
            backgroundColor: '#f1f5f9',
            padding: '0.2em 0.4em',
            borderRadius: '0.25em',
            fontSize: '0.875em',
          },
          '& pre': {
            backgroundColor: '#1e293b',
            color: '#e2e8f0',
            padding: '1em',
            borderRadius: '0.375em',
            overflow: 'auto',
          },
        },
      });
    },
  ],
};