import { useState, useEffect } from "react";

export default function ThemeSwitcher() {
  // Liste de thèmes DaisyUI flashy
  const themes = ["dark", "light", "synthwave", "cyberpunk", "valentine", "pastel"];
  
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const nextTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <button
      className="btn btn-sm btn-secondary fixed top-4 right-4 z-50 shadow-lg rounded-full"
      onClick={nextTheme}
    >
      Theme: {theme}
    </button>
  );
}
