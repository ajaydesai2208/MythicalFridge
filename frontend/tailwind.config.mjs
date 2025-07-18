/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

// Base Tailwind configuration object
const tailwindConfig = {
  // Paths to all template files
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],

  // Enable dark mode via class strategy
  darkMode: 'class',

  theme: {
    // Responsive breakpoints
    screens: {
      xs: '480px',
      ...defaultTheme.screens
    },

    extend: {
      // Color palette
      colors: {
        // Map our CSS vars into Tailwind color utilities
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',

        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        primary: {
          light: '#5EEAD4',
          DEFAULT: '#14B8A6',
          dark: '#0F766E'
        },
        secondary: {
          light: '#FDE68A',
          DEFAULT: '#FBBF24',
          dark: '#F59E0B'
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        },
        success: {
          light: '#D1FAE5',
          DEFAULT: '#10B981',
          dark: '#047857'
        },
        warning: {
          light: '#FEF3C7',
          DEFAULT: '#FBBF24',
          dark: '#F59E0B'
        },
        error: {
          light: '#FEE2E2',
          DEFAULT: '#EF4444',
          dark: '#B91C1C'
        },
        info: {
          light: '#DBEAFE',
          DEFAULT: '#3B82F6',
          dark: '#1E40AF'
        }
      },

      // Spacing scale (based on 4px unit)
      spacing: {
        px: '1px',
        0: '0px',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
        40: '10rem',
        48: '12rem',
        56: '14rem',
        64: '16rem'
      },

      // Border widths and radii
      borderWidth: {
        DEFAULT: '1px',
        0: '0px',
        2: '2px',
        4: '4px',
        8: '8px'
      },
      borderRadius: {
        none: '0px',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '1rem',
        '2xl': '1.5rem',
        full: '9999px'
      },

      // Outline (focus) settings
      outlineWidth: {
        DEFAULT: '2px',
        4: '4px'
      },
      outlineOffset: {
        0: '0px',
        2: '2px',
        4: '4px'
      },

      // Box shadows
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
        md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
        xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
        inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
        none: 'none'
      },

      // Ring (focus) utilities
      ringWidth: {
        DEFAULT: '3px',
        0: '0px',
        1: '1px',
        2: '2px',
        4: '4px',
        8: '8px'
      },
      ringColor: theme => ({
        DEFAULT: theme('colors.primary.DEFAULT'),
        primary: theme('colors.primary.DEFAULT'),
        secondary: theme('colors.secondary.DEFAULT'),
        error: theme('colors.error.DEFAULT')
      }),
      ringOffsetWidth: {
        0: '0px',
        1: '1px',
        2: '2px',
        4: '4px'
      },

      // Typography scales
      fontFamily: {
        // Use the CSS variable that Next’s localFont injected
        sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }]
      },

      // Transition durations
      transitionDuration: { ...defaultTheme.transitionDuration },

      // Z-index layers
      zIndex: { ...defaultTheme.zIndex }
    }
  },

  plugins: [
    forms,
    typography
  ]
};

export default tailwindConfig;
