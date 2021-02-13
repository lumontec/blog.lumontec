const defaultTheme = require('tailwindcss/defaultTheme')
const mdx = require('@mdx-js/mdx')

module.exports = {
  purge: {
    mode: 'all',
    content: ['./src/**/*.{js,mdx}', './next.config.js'],
    options: {
      extractors: [
        {
          extensions: ['mdx'],
          extractor: content => {
            content = mdx.sync(content)

            // Capture as liberally as possible, including things like `h-(screen-1.5)`
            const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

            // Capture classes within other delimiters like .block(class="w-1/2") in Pug
            const innerMatches =
              content.match(/[^<>"'`\s.(){}[\]#=%]*[^<>"'`\s.(){}[\]#=%:]/g) || []

            return broadMatches.concat(innerMatches)
          },
        },
      ],
    },
  },
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
      lineHeight: {
        '11': '2.75rem',
        '12': '3rem',
        '13': '3.25rem',
        '14': '3.5rem',
      },
      fontFamily: {
        sans: [
          'Maven Pro',
          'system-ui',
          'Poppins',
          'Roboto',
          'Inter var',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      colors: {
        code: {
          teal: '#0694a2',
          green: '#a3be8c',
          yellow: '#ebcb8b',
          purple: '#b48ead',
          red: '#bf616a',
          blue: '#5e81ac',
          white: '#fff',
        },
      },
      typography: theme => ({
        excerpt: {
          css: {
            fontSize: '16px',
            letterSpacing: theme('letterSpacing.tight'),
          },
        },
        default: {
          css: {
            color: theme('colors.gray.700'),
            fontFamily: 'inherit',
            fontSize: '15px',
            letterSpacing: theme('letterSpacing.tight'),
            strong: {
              fontWeight: '600',
              color: theme('colors.gray.700'),
            },
            h2: {
              fontWeight: '400',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.800'),
            },
            h3: {
              letterSpacing: theme('letterSpacing.tight'),
              fontWeight: '400',
              color: theme('colors.gray.800'),
            },
            'ol li:before': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li:before': {
              backgroundColor: theme('colors.gray.400'),
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              color: theme('colors.gray.700'),
              backgroundColor: 'transparent',
              backgroundColor: theme('colors.gray.100'),
              borderColor: theme('colors.gray.300'),
              borderRadius: '4px',
              borderWidth: '1px',
              fontSize: '13.5px',
              fontWeight: '400',
              letterSpacing: theme('letterSpacing.wide'),
              padding: '2px',
            },
            a: {
              color: theme('colors.gray.700'),
            },
            pre: {
              color: theme('colors.gray.600'),
              backgroundColor: theme('colors.gray.100'),
              borderColor: theme('colors.gray.300'),
              borderWidth: '1px',
              fontSize: '13.5px',
              // spacing: '20px'
            },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200'),
            },
          },
        },
      }),
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui'),
    require('@tailwindcss/typography'),
    function({ addBase, addComponents, theme }) {
      addBase([
        {
          '@font-face': {
            fontFamily: 'Inter var',
            fontWeight: '100 900',
            fontStyle: 'normal',
            fontNamedInstance: 'Regular',
            fontDisplay: 'swap',
            src: 'url("/fonts/Inter-roman.var-latin.woff2?3.13") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Inter var',
            fontWeight: '100 900',
            fontStyle: 'italic',
            fontNamedInstance: 'Italic',
            fontDisplay: 'swap',
            src: 'url("/fonts/Inter-italic.var-latin.woff2?3.13") format("woff2")',
          },
        },
      ])
    },
  ],
}
