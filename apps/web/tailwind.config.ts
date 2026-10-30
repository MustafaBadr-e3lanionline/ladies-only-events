import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          burgundy: "#7A1C3E",    // النبيتي الأساسي للأزرار والهوية
          burgundyDark: "#5A122C",
          rose: "#D85B7F",        // الوردي الهادئ للعناصر التفاعلية
          peach: "#F3C1A8",       // الخوخي الفاتح للخلفيات والبطاقات
          ivory: "#FDFBF7",       // الأبيض العاجي لخلفية المنصة
          softPink: "#F9ECEF",    // خلفية الأقسام الفرعية
          teal: "#3A7D8C",        // التركواز المساند للتنبيهات والشارات
          adminDark: "#1E162B",   // خلفية القائمة الجانبية للوحة التحكم
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-cairo)", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px -5px rgba(122, 28, 62, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
