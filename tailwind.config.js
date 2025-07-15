/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
       fontFamily: {
        heading: ['"Anton"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        cabin: ["Cabin", "sans-serif"],
        plusJakartaSans: ["Plus Jakarta Sans", "sans-serif"],
      
      },
      colors: {
        primary: "#FF6B00",       // Main bright orange
        accent: "#34D399",        // Green success
        darkBg: "#121212",        // App background
        darkSurface: "#1F1F1F",   // Card panels
        lightText: "#F3F4F6",     // Light text
        secondaryText: "#9CA3AF", // Muted text
      },
      boxShadow: {
        glow: "0 0 15px #FF6B00",
        neonGreen: "0 0 10px #34D399",
        neonOrange: "0 0 10px #FF6B00",
      },
      animation: {
        bounceSlow: "bounce 2s infinite",
        slideUp: "slideUp 0.4s ease-out",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      backgroundImage: {
        PrimaryGradient:
          "linear-gradient(180deg, #CE9FFC 0%, #A582F7 50.52%, #7367F0 100%)",
      },
    },
  },
};
