import React from "react";
import {NavLink} from "react-router-dom";
import {Nav} from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";
import logo from "logo.svg";
var ps;

function Sidebar(props) {
    const sidebar = React.useRef();
    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName) => {
        return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };
    React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(sidebar.current, {
                suppressScrollX: true,
                suppressScrollY: false,
            });
        }
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
            }
        };
    });
    return (
        <div
            className="sidebar"
            data-color={props.bgColor}
            data-active-color={props.activeColor}
        >
            <div className="logo">
                <a
                    className="simple-text logo-mini"
                >
                    <div className="logo-img">
                        <img src={logo} alt="react-logo"/>
                    </div>
                </a>
                <a
                    className="simple-text logo-normal"
                >
                   SHOT IT
                </a>
            </div>
            <div className="sidebar-wrapper" ref={sidebar}>
                <Nav>

                    {props.routes.map((prop, key) => {
                        if(prop.sidebar)
                        return (
                            <li
                                className={
                                    activeRoute(prop.path)
                                }
                                key={key}
                            >
                                <NavLink
                                    to={prop.layout + prop.path}
                                    className="nav-link"
                                    activeClassName="active"
                                >
                                    <i className={prop.icon}/>
                                    <p>{prop.name}</p>
                                </NavLink>
                            </li>
                        );
                    })}
                </Nav>
            </div>
        </div>
    );
}

export default Sidebar;
