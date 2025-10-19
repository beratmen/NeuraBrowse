// Animation and styling utilities

export const animations = {
  fadeIn: {
    '@keyframes fadeIn': {
      from: {
        opacity: 0,
        transform: 'translateY(20px)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
    animation: 'fadeIn 0.5s ease-in-out',
  },

  slideIn: {
    '@keyframes slideIn': {
      from: {
        opacity: 0,
        transform: 'translateX(-30px)',
      },
      to: {
        opacity: 1,
        transform: 'translateX(0)',
      },
    },
    animation: 'slideIn 0.4s ease-out',
  },

  scaleIn: {
    '@keyframes scaleIn': {
      from: {
        opacity: 0,
        transform: 'scale(0.9)',
      },
      to: {
        opacity: 1,
        transform: 'scale(1)',
      },
    },
    animation: 'scaleIn 0.3s ease-out',
  },

  pulse: {
    '@keyframes pulse': {
      '0%': {
        transform: 'scale(1)',
      },
      '50%': {
        transform: 'scale(1.05)',
      },
      '100%': {
        transform: 'scale(1)',
      },
    },
    animation: 'pulse 2s ease-in-out infinite',
  },
};

export const cardHoverEffect = {
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: (theme: any) => theme.shadows[8],
  },
};

export const gradientBackground = (color1: string, color2: string) => ({
  background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
});

export const glassmorphism = {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
};
