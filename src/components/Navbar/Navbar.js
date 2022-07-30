import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Button } from '../Button/ButtonElements';
import { Nav, NavLink, Bars, NavMenu, menuData, NavBtn, themeHome, themeOther } from './NavbarElements';
import { Navigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
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

  const guestLinks = () => (
    <Fragment>
        <li className='nav-item'>
            {/* <Link className='nav-link' to='/login'>Login</Link> */}
            <NavLink to="/login">Login</NavLink>
        </li>
        <li className='nav-item'>
            {/* <Link className='nav-link' to='/signup'>Sign Up</Link> */}
            <NavLink to="/signup">Sign Up</NavLink>
        </li>
    </Fragment>
  );

  const authLinks = () => (
    <Fragment>
    <li className='nav-item'>
        {/* <Link className='nav-link' to='/trips'>Trips</Link> */}
        <NavLink to="/trips">Trips</NavLink>
    </li>
    <li className='nav-item'>
        {/* <Link className='nav-link' to='/itinerary'>Itinerary</Link> */}
        <NavLink to="/itinerary">Itinerary</NavLink>
    </li>
    <li className='nav-item'>
        <NavLink to="/contact">Landmarks</NavLink>
    </li>
    </Fragment>
  );

  // Navbar Template
  return (
    <>
      <ThemeProvider theme={theme}>
      <nav className='navbar navbar-expand-lg navbar-light bg-dark'>
        <NavLink to="/"><b>FAST TRAVEL</b></NavLink>
        <Bars />
        {/* <NavMenu>
          {menuData.map((item, index) => (
            <NavLink to={item.link} key={index}>
              {item.title}
            </NavLink>
          ))}
        </NavMenu> */}

        <div className='collapse navbar-collapse' id='navbarNav'>
                <ul className='navbar-nav'>
                        <li className='nav-item active'>
                            {/* <Link className='nav-link' to='/'> About </Link> */}
                            <NavLink to="/">About</NavLink>
                        </li>
                        {isAuthenticated ? authLinks() : guestLinks()}
                        <li className='nav-item'>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                </ul>
        </div>

        <NavBtn>
          {isAuthenticated ? <Button primary="true" round="true" to="/logout/" onClick={logout}>Logout</Button> : <Button primary="true" round="true" to="/login/">Sign In</Button>}
        </NavBtn>

      </nav>
      </ThemeProvider>
    </>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);