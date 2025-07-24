module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Blue
        secondary: '#8B5CF6', // Purple
        accent: '#10B981', // Green
        dark: '#1F2937',
        light: '#F9FAFB',
      },
      backgroundImage: {
        'gradient-primary-secondary': 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
      },
      keyframes: {
        'gradient-mesh': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(20px)' },
        },
      },
      animation: {
        'gradient-mesh': 'gradient-mesh 8s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        float2: 'float2 7s ease-in-out infinite',
      },
      screens: {
        'mobile': '320px',
        'tablet': '768px',
        'desktop': '1024px',
        'lg-desktop': '1440px',
      },
    },
  },
  plugins: [],
}; 