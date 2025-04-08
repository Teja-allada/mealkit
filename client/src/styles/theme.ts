export const colors = {
  primary: {
    light: '#7CCDC4',
    DEFAULT: '#5CBEB5',
    dark: '#4A9E95',
  },
  secondary: {
    light: '#A8D97C',
    DEFAULT: '#97C86B',
    dark: '#86B75A',
  },
  accent: {
    light: '#FF6B6B',
    DEFAULT: '#FF5252',
    dark: '#FF3939',
  },
  background: {
    light: '#FFF9F5',
    DEFAULT: '#FFF5ED',
    dark: '#FFF0E6',
  }
};

export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  cardHover: {
    whileHover: { 
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
    transition: { type: "spring", stiffness: 300 },
  },
  buttonTap: {
    whileTap: { scale: 0.98 },
  },
  float: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
  spin: {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      },
    },
  },
  decorativeBlob: {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 45, 0],
      opacity: [0.5, 0.7, 0.5],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
};

export const gradients = {
  primary: "bg-gradient-to-r from-[#7CCDC4] to-[#A8D97C]",
  secondary: "bg-gradient-to-r from-[#FF6B6B] to-[#FF9F43]",
  background: "bg-gradient-to-br from-amber-50 via-orange-50 to-red-50",
};

export const shadows = {
  sm: "shadow-sm hover:shadow transition-shadow duration-200",
  md: "shadow-md hover:shadow-lg transition-shadow duration-200",
  lg: "shadow-lg hover:shadow-xl transition-shadow duration-200",
};

export const glassmorphism = {
  light: "bg-white/80 backdrop-blur-sm",
  medium: "bg-white/90 backdrop-blur-md",
  heavy: "bg-white/95 backdrop-blur-lg",
};

export const decorativeElements = {
  spices: [
    { icon: "🌶️", delay: 0 },
    { icon: "🧄", delay: 0.2 },
    { icon: "🌿", delay: 0.4 },
    { icon: "🍃", delay: 0.6 },
  ],
  utensils: [
    { icon: "🥄", delay: 0 },
    { icon: "🍴", delay: 0.3 },
    { icon: "🥢", delay: 0.6 },
  ],
}; 