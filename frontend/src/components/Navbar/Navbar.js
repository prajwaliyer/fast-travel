import React from 'react'
import { Nav, NavLink, Bars } from './NavbarElements';

const Navbar = () => {
  return (
    <>
        <Nav>
            <NavLink to="/">Home</NavLink>
            <Bars />
        </Nav>
    </>
  )
}

export default Navbar;