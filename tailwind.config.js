/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          750: '#2D3748', // Custom shade between 700 and 800
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            code: {
              backgroundColor: theme('colors.gray.100'),
              borderRadius: theme('borderRadius.md'),
              padding: theme('spacing.1'),
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            'blockquote p:first-of-type::before': {
              content: 'none',
            },
            'blockquote p:last-of-type::after': {
              content: 'none',
            },
          },
        },
        invert: {
          css: {
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
          },
        },
      }),
      gridTemplateColumns: {
        '18': 'repeat(18, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.prose': {
          '@apply max-w-none': {},
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            '@apply font-bold mb-4 mt-6': {},
          },
          '& h1': {
            '@apply text-3xl': {},
          },
          '& h2': {
            '@apply text-2xl': {},
          },
          '& h3': {
            '@apply text-xl': {},
          },
          '& p': {
            '@apply mb-4': {},
          },
          '& ul, & ol': {
            '@apply mb-4 pl-6': {},
          },
          '& ul': {
            '@apply list-disc': {},
          },
          '& ol': {
            '@apply list-decimal': {},
          },
          '& blockquote': {
            '@apply border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4': {},
          },
          '& pre': {
            '@apply p-4 rounded bg-gray-100 dark:bg-gray-800 overflow-auto mb-4': {},
          },
          '& table': {
            '@apply w-full border-collapse mb-4': {},
          },
          '& th, & td': {
            '@apply border border-gray-300 dark:border-gray-700 p-2': {},
          },
          '& th': {
            '@apply bg-gray-100 dark:bg-gray-800': {},
          },
          '& img': {
            '@apply max-w-full h-auto my-4 rounded': {},
          },
          '& hr': {
            '@apply my-6 border-t border-gray-300 dark:border-gray-700': {},
          },
          '& a': {
            '@apply text-blue-600 dark:text-blue-400 hover:underline': {},
          },
        },
      });
    },
  ],
};