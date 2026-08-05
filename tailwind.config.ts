import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1180px",
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: "#102A43",
          50: "#EAF2FF",
          100: "#D3E3F7",
          600: "#1B3A5C",
          900: "#102A43",
        },
        royal: {
          DEFAULT: "#2563EB",
          50: "#EFF6FF",
          600: "#2563EB",
          700: "#1D4ED8",
        },
        gold: {
          DEFAULT: "#D9A441",
          50: "#FBF3E3",
          600: "#D9A441",
          700: "#B9862B",
        },
        surface: {
          soft: "#EAF2FF",
          off: "#F8FAFC",
          white: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#172033",
          muted: "#64748B",
        },
        success: "#15803D",
        warning: "#B45309",
        border: "hsl(214 32% 91%)",
        input: "hsl(214 32% 91%)",
        ring: "#2563EB",
        background: "#FFFFFF",
        foreground: "#172033",
        primary: {
          DEFAULT: "#102A43",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#2563EB",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#D9A441",
          foreground: "#102A43",
        },
        muted: {
          DEFAULT: "#EAF2FF",
          foreground: "#64748B",
        },
        destructive: {
          DEFAULT: "#B91C1C",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#172033",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 12px -2px rgb(16 42 67 / 0.08)",
        card: "0 8px 30px -8px rgb(16 42 67 / 0.15)",
        lift: "0 20px 45px -15px rgb(16 42 67 / 0.25)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
