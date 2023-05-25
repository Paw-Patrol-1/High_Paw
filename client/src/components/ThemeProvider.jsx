import { useState, useEffect, useContext } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { createContext } from "react";

export const ThemeContext = createContext();
// ThemeProvider component that wraps the entire app and provides the theme context to all components
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    // ThemeContext.Provider component that provides the theme and toggleTheme function to all components , value is the prop that is passed to all components
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
// custom hook to use the theme context in any component that needs it (no need to import useContext and ThemeContext) , returns the theme and toggleTheme function
export const useThemeContext = () => useContext(ThemeContext);

export default ThemeProvider;
