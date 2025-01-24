import React, { createContext, useState, useContext, useEffect } from 'react';
 
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(window.localStorage.getItem('theme')==="false"?false:true);  
  if (window.localStorage.getItem('theme') === 'false' || (!(window.localStorage.getItem('theme')))) {
    document.documentElement.classList.add('dark')
    window.localStorage.setItem('theme', false); 
  } else {
    document.documentElement.classList.remove('dark')
    window.localStorage.setItem('theme', true); 
  }
  useEffect(() => {  
  }, []);

  const toggleTheme = () => {
    let newTheme
    newTheme = (theme === false || theme === "false") ? true : false;
    if(newTheme===false){
      document.documentElement.classList.add('dark')
      setTheme(newTheme);
      window.localStorage.setItem('theme', newTheme);
    }else{
      document.documentElement.classList.remove('dark')
      setTheme(newTheme);
      window.localStorage.setItem('theme', newTheme);
    } 
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  ); 
};
export const useTheme = () => useContext(ThemeContext);

