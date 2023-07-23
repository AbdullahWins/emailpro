import React, { createContext, useEffect, useState } from "react";
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState();

  const handleToggleTheme = (theme) => {
    localStorage.setItem("isDarkMode", theme);
    setIsDarkMode(theme);
  };

  useEffect(() => {
    const theme = localStorage.getItem("isDarkMode");
    setIsDarkMode(theme === "true");
  }, []);

  const value = {
    isDarkMode,
    handleToggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
