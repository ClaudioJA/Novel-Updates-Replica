import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import NavBar_1 from './NavBar_1';
import Cookies from 'js-cookie';
import SideMenu from './SideMenu';
import './styles/Layout-Style.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import LoremIpsum from './LoremIpsum';
import UserRoleValidation from './UserRoleValidation';

function Layout( { children }: { children: React.ReactNode } ) {
  const [userRole, setRole] = useState(0);
  let [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const uRole = Cookies.get('userRole');

    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);

    document.documentElement.classList.toggle('dark-mode', isDarkMode);

    if(uRole === undefined){
      setRole(0);
    }
    else{
      setRole(1);
    }

  }, []);

  const handleVariableChange = (isDark: boolean) => {
    // console.log(isDark);
    document.documentElement.classList.toggle('dark-mode', isDark);
    localStorage.setItem('darkMode', isDark.toString());
    setDarkMode(isDark);
    // console.log("Changes");
  }

  function toTopBtn() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // This creates a smooth scrolling effect
    });
  }

  return (
    <div>
      <div id='topPage'></div>
      <div className='navbar'>
        {userRole === 0 ? <NavBar handleChange={handleVariableChange}/> : null}
        {userRole === 1 ? <NavBar_1 handleChange={handleVariableChange}/> : null}
      </div>
      <div className={`page ${darkMode ? 'dark-mode' : ''}`}>
        <div className='content'>{children}</div>
        <div className='sideMenu'><SideMenu /></div>
      </div>
      <div className='footer'>
        <Footer />
      </div>

      {/* <LoremIpsum /> */}

      <div className='toTop'>
        <button onClick={toTopBtn}>
          Top
        </button>
      </div>
    </div>
  );
}

export default Layout;