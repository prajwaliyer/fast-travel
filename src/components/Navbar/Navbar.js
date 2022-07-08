import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Button } from '../Button/ButtonElements';
import { Nav, NavLink, Bars, NavMenu, menuData, NavBtn, themeHome, themeOther } from './NavbarElements';
import { useLocation } from 'react-router-dom';

const Navbar = () => {

  // Choose theme
  let location = useLocation();
  console.log(location.pathname);
  const isMyLocation = location.pathname === "/";
  const [theme, setTheme] = useState(themeHome)

  useEffect(() => {
    if (isMyLocation) {
      setTheme(themeHome);
    } 
    else {
      setTheme(themeOther);
    }
  }, [location.pathname, isMyLocation]);

  // Navbar Template
  return (
    <>
      <ThemeProvider theme={theme}>
      <Nav>
        <NavLink to="/"><b>FAST TRAVEL</b></NavLink>
        <Bars />
        <NavMenu>
          {menuData.map((item, index) => (
            <NavLink to={item.link} key={index}>
              {item.title}
            </NavLink>
          ))}
        </NavMenu>
        <NavBtn>
          <Button primary="true" round="true" to="/sign-in/">Sign In</Button>
        </NavBtn>
      </Nav>
      </ThemeProvider>
    </>
  )
}

export default Navbar