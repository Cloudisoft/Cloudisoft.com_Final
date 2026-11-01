module.exports = {
  content: ["./index.html", "./src/**/*.{tsx,ts,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand: taken from the Cloudisoft logo (ink background, ember → sun gradient)
        ink: {
          DEFAULT: "#0B031C",
          900: "#0B031C",
          800: "#120A27",
          700: "#1A1233",
          600: "#2A2145",
        },
        bone: "#F4EFE6",
        mute: "#A7A0B8",
        ember: "#FF5A1F",
        amber: "#FF9F1C",
        sun: "#FFD93D",
        // kept for the /cloudicore and /dashboard pages
        "cloudi-bg": "#0B031C",
        "cloudi-card": "#120A27",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Geist"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        site: "76rem",
      },
    },
  },
  plugins: [],
};
