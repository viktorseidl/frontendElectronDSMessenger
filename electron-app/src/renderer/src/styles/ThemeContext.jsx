import React, { createContext, useState, useContext, useEffect } from 'react';
 
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState((localStorage.getItem('theme') === 'false' || (!(localStorage.getItem('theme'))))?false:true);
  if (localStorage.getItem('theme') === 'false' || (!(localStorage.getItem('theme')))) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', false); 
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', true); 
  }
  useEffect(() => { 
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') || prefersDark?false:true;
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = (theme === false || theme === "false") ? true : false;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Persist theme preference
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  ); 
};
export const useTheme = () => useContext(ThemeContext);

