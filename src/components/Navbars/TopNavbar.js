import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {
  Collapse,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";

import routes from "routes.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import AuthService from "services/auth.service";

function TopNavbar(props) {
  const [value, setValue] = useState("");
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [dropdownSettingsOpen, setDropdownSettingsOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef();
  const location = useLocation();
  const handleChange = (event) => {
    props.handleSearchBarVal(event.target.value);
  }
    const handleActiveClick = (color) => {
        props.handleActiveClick(color);
        setActiveColor(color);
    };
    const handleBgClick = (color) => {
      props.handleBgClick(color);
      setBackgroundColor(color);
    };
  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };
  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };
  const dropdownSettingsToggle = (e) => {
    setDropdownSettingsOpen(!dropdownSettingsOpen);
  };
  const getBrand = () => {
    let brandName = "Cocktail Details";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);
  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      color={color}
      expand="lg"
      className={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand >{getBrand()}</NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <form>
            <InputGroup className="no-border">
              <Input
                  value={props.searchBarVal}
                  onChange={handleChange}
                  placeholder="Search..." />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </form>
          <Nav navbar>
            <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={(e) => dropdownToggle(e)}
            >
              <DropdownToggle caret nav>
                <i className="nc-icon nc-single-02" />
              </DropdownToggle>
              <DropdownMenu right>
                { AuthService.getCurrentUser() ? <DropdownItem tag="a" href={"/user"}>User Profile</DropdownItem> : <DropdownItem style={{color:"lightgrey", cursor:"not-allowed"}} tag="a" >User Profile</DropdownItem> }
                { AuthService.getCurrentUser() ? <DropdownItem tag="a" href={"/livechat"}>Live Chat</DropdownItem> : <DropdownItem style={{color:"lightgrey", cursor:"not-allowed"}} tag="a" >Live Chat</DropdownItem> }
                { !AuthService.getCurrentUser() ? <DropdownItem tag="a" href={"/login"}>Log in</DropdownItem> : null }
                { !AuthService.getCurrentUser() ? <DropdownItem tag="a" href={"/signup"}>Sign up</DropdownItem> : null }
                { AuthService.getCurrentUser() ? <DropdownItem tag="a" href={"/allcocktails"} onClick={ () => AuthService.logout()}>Log out</DropdownItem> : null }
              </DropdownMenu>
            </Dropdown>
            <Dropdown
                nav
                isOpen={dropdownSettingsOpen}
                toggle={(e) => dropdownSettingsToggle(e)}
            >
              <DropdownToggle caret nav>
                <i className="nc-icon nc-settings-gear-65" />
              </DropdownToggle>
              <DropdownMenu right>
                  <FixedPlugin
                      bgColor={backgroundColor}
                      activeColor={activeColor}
                      handleActiveClick={handleActiveClick}
                      handleBgClick={handleBgClick}
                  />
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
