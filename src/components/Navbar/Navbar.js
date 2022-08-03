import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Button } from '../Button/ButtonElements';
import { Nav, NavLink, Bars, NavMenu, menuData, NavBtn, themeHome, themeOther, homeData } from './NavbarElements';
import { useLocation } from 'react-router-dom';

import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ logout, isAuthenticated }) => {

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
          {isAuthenticated ? 
            (
              menuData.map((item, index) => (
                <NavLink to={item.link} key={index}>
                  {item.title}
                </NavLink>
              ))
            ) : ( 
              homeData.map((item, index) => (
                <NavLink to={item.link} key={index}>
                  {item.title}
                </NavLink>
              ))
            )
          }
        </NavMenu>
    
        <NavBtn>
          {isAuthenticated ? <Button primary="true" round="true" to="/" onClick={logout}>Logout</Button> : <Button primary="true" round="true" to="/login/">Sign In</Button>}
        </NavBtn>

      </Nav>
      </ThemeProvider>
    </>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);
// export default Navbar