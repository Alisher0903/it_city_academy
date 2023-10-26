import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button,
} from 'reactstrap';
import "./style.scss";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { ThemeEditor } from '../ThemeEditor';

function DestopNavbar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const goLogin = () => document.getElementById("goLogin").click();

    return (
        <>
            <Link to="/auth/sign-in/default" id="goLogin"></Link>
            <Navbar className='home_main' fixed='top' expand="sm">
                <NavbarBrand className='home_nav-brend' href="/">IT CITY ACADEMY</NavbarBrand>
                {/* <NavbarToggler className='nav_toggler' onClick={toggle} /> */}
                {/* <Collapse className='nav_collapse' isOpen={isOpen} navbar> */}
                <NavbarText>
                    <ThemeEditor />
                    <Button onClick={goLogin} className='px-4 fw-bolder rounded-0' color='warning' outline>LogIn</Button>
                </NavbarText>
                {/* </Collapse> */}
            </Navbar>
        </>
    );
}

export default DestopNavbar;