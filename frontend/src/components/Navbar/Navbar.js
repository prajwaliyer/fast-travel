import React from 'react'
import { Button } from '../Button/ButtonElements';
import { Nav, NavLink, Bars, NavMenu, menuData, NavBtn } from './NavbarElements';

const Navbar = () => {
  return (
    <>
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
    </>
  )
}

export default Navbar