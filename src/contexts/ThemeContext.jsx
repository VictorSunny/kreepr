import { useContext, createContext, useState } from 'react';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  ////    CONTEXT PROVIDER FOR SITE THEME

  const [darkTheme, setDarkTheme] = useState(false);

  const values = {
    darkTheme,
    setDarkTheme,
  };

  return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
};
