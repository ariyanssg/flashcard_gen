// src/styles/theme.ts
export const theme = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
    },
    neutral: {
      50: '#fafafa',
      100: '#f4f4f5',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b',
    }
  },
  fonts: {
    sans: 'Inter, system-ui, sans-serif',
    display: 'Cal Sans, sans-serif',
  },
  animations: {
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 }
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.2 }
    }
  }
};