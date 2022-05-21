import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
   const setCaveTheme = () => {
      const caveTheme = localStorage.getItem("theme");
      return caveTheme === null ? "light" : caveTheme;
   };

   const [theme, setTheme] = useState(setCaveTheme());

   useEffect(() => {
      localStorage.setItem("theme", theme);
   }, [theme]);

   return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
         {children}
      </ThemeContext.Provider>
   );
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };