import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

// Temas disponíveis
const themes = {
  light: {
    name: "light",
    label: "Claro",
    bodyClass: "theme-light",
  },
  dark: {
    name: "dark",
    label: "Escuro",
    bodyClass: "theme-dark",
  },
};

const ThemeContext = createContext({
  theme: themes.light,
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  // Tenta pegar o tema salvo no localStorage, senão usa o claro
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    return saved && themes[saved] ? themes[saved] : themes.light;
  };

  const [theme, setThemeState] = useState(getInitialTheme);

  // Atualiza o tema e salva no localStorage
  const setTheme = useCallback((themeObj) => {
    setThemeState(themeObj);
    localStorage.setItem("theme", themeObj.name);
  }, []);

  // Alterna entre claro e escuro
  const toggleTheme = useCallback(() => {
    setTheme(theme.name === "light" ? themes.dark : themes.light);
  }, [theme, setTheme]);

  // Atualiza a classe do body ao mudar o tema
  useEffect(() => {
    document.body.classList.remove(...Object.values(themes).map(t => t.bodyClass));
    document.body.classList.add(theme.bodyClass);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para consumir o contexto
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext; 