// Modern, carefully selected color palette
export const colors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  accent: {
    purple: '#8b5cf6',
    indigo: '#6366f1',
    blue: '#3b82f6',
    cyan: '#06b6d4',
    teal: '#14b8a6',
  },
  node: {
    root: {
      primary: '#6366f1',   // Indigo
      secondary: '#4f46e5',
      hover: '#4338ca',
    },
    parent: {
      primary: '#3b82f6',   // Blue
      secondary: '#2563eb',
      hover: '#1d4ed8',
    },
    child: {
      primary: '#06b6d4',   // Cyan
      secondary: '#0891b2',
      hover: '#0e7490',
    },
    leaf: {
      primary: '#14b8a6',   // Teal
      secondary: '#0d9488',
      hover: '#0f766e',
    },
    selected: {
      primary: '#8b5cf6',   // Purple
      secondary: '#7c3aed',
      hover: '#6d28d9',
    },
  },
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
};

// Modern shadows
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
};

// Modern animations
export const animations = {
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 }
  }
}; 