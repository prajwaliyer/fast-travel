import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

export const Nav = styled.nav`
    box-sizing: border-box;
    background: ${props => props.theme.background};
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem calc((100vw - 1300px) / 2);
    z-index: 100;
    position: relative;
`
Nav.defaultProps = {
    theme: {
        background: "black"
    }
}

export const themeHome = {
    background: "transparent"
};
export const themeOther = {
    background: "black"
};

export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
`

export const Bars = styled(FaBars)`
    display: none;
    color: #fff;

    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -48px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const menuData = [
    {title: "About", link: "/about"},
    {title: "Trips", link: "/trips"},
    {title: "Itinerary", link: "/itinerary"},
    {title: "Contact", link: "/contact"},
]

export const NavBtn = styled.div`
    display: flex;
    align-items: center;
    margin-right: 24px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`