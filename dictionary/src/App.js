import React, { useState, useEffect, createContext } from 'react';
import './App.css'; // Import your global CSS file
import NavBar from './NavBar/NavBar';
import SearchBar from './searchBox/searchBar';
import Footer from './footer/footer';

export const themeContext = createContext(null)
function App() {
  const [theme, setTheme] = useState('light');
  const [fontType, setFont] = useState('Roboto');
  const toggleTheme = ()=>{
    setTheme((prev)=> prev === 'light'? 'dark' : 'light')
  }

  return (
    <themeContext.Provider value={{theme, toggleTheme, fontType, setFont}}>
      <main id={theme} className={fontType}>
        <div className='app'>
        <NavBar />
        <SearchBar />
        <Footer />
    </div>
      </main>
    </themeContext.Provider>
  );
}

export default App;
