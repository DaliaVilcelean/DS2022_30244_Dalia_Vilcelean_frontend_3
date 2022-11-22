import React from 'react'
import logo from './commons/images/icon.png';


import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap/';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const textStyle = {
    color: 'white',
    textDecoration: 'none'
};




/*
const logOut=()=>{
    navigate('/')
}
  <Button color="primary" onClick={logOut}>Log Out </Button>
*/

const logOut=()=>{

}

const NavigationBar = () => (

  

    <div>
        <Navbar color="dark" light expand="md">
            <NavbarBrand href="/">
                <img src={logo} width={"50"}
                     height={"35"} />
            </NavbarBrand>
            <Nav className="mr-auto" navbar>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle style={textStyle} nav caret>
                       Menu
                    </DropdownToggle>
                    <DropdownMenu right >

                        <DropdownItem>
                            <NavLink href="/person">Persons</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/device">Devices</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/userdevice">Assign</NavLink>
                        </DropdownItem>
                      


                    </DropdownMenu>
                </UncontrolledDropdown>

            </Nav>
            <Nav>
            <Button color="primary" onClick={logOut}>Log Out </Button>
            </Nav>
        </Navbar>
    </div>
);

export default NavigationBar
