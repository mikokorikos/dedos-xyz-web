import type { Config } from "tailwindcss"

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#020817",
        "bg-alt": "#0b1224",
        accent: "#8b5cf6",
        cyan: "#06b6d4",
        pink: "#ec4899",
        gold: "#f59e0b"
      },
      borderRadius: {
        xl: "16px",
        "2xl": "24px"
      },
      boxShadow: {
        glass: "0 10px 40px rgba(0,0,0,0.5)",
        glassLg: "0 20px 60px rgba(0,0,0,0.7)"
      },
      keyframes: {
        spinSlow: { to: { transform: "rotate(360deg)" } },
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "50%": { transform: "translate3d(2%,-2%,0) rotate(8deg)" }
        },
        lettersShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "300% 50%" }
        },
        floatChar: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" }
        }
      },
      animation: {
        spinSlow: "spinSlow 9s linear infinite",
        drift: "drift 24s ease-in-out infinite",
        lettersShift: "lettersShift 8s linear infinite",
        floatChar: "floatChar 4.5s ease-in-out infinite"
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)"
      }
    }
  },
  plugins: []
} satisfies Config
