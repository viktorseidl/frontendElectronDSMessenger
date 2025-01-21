import React, { createContext, useState, useContext, useEffect } from 'react';
 
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState((window.localStorage.getItem('theme') === 'false' || (!(window.localStorage.getItem('theme'))))?false:true);
  if (window.localStorage.getItem('theme') === 'false' || (!(window.localStorage.getItem('theme')))) {
    document.documentElement.classList.add('dark')
    window.localStorage.setItem('theme', false); 
  } else {
    document.documentElement.classList.remove('dark')
    window.localStorage.setItem('theme', true); 
  }
  useEffect(() => { 
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = window.localStorage.getItem('theme') || prefersDark?false:true;
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    let newTheme
    if((!(window.localStorage.getItem('theme')))){
      newTheme = (theme === false || theme === "false") ? true : false;
    }else{
      newTheme = (window.localStorage.getItem('theme') === false || window.localStorage.getItem('theme') === "false") ? true : false;
    }
    setTheme(newTheme);
    window.localStorage.setItem('theme', newTheme); // Persist theme preference
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  ); 
};
export const useTheme = () => useContext(ThemeContext);

