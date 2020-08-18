import React, { Component } from "react";
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
} from "reactstrap";

class AppNavbar extends Component {
  state = {
    collapsed: false,
  };
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <NavbarBrand href="/" className="mr-auto">
            Mental-Health-App
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} className="mr-2" />
          <Collapse isOpen={this.state.collapsed} navbar>
            <Nav className = "ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Quotes</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">Pictures</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">Songs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  Resources
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  componentDidMount(){
   console.log(localStorage.getItem('token'));
  }
}



export default AppNavbar;
