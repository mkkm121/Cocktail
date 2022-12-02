import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import {Route, Switch, useLocation} from "react-router-dom";
import AllCocktails from "views/AllCocktails.js";
import TopNavbar from "components/Navbars/TopNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

var ps;

function Dashboard(props) {
    const [searchBarVal, setSearchBarVal] = React.useState("");
    const [backgroundColor, setBackgroundColor] = React.useState("black");
    const [activeColor, setActiveColor] = React.useState("info");
    const mainPanel = React.useRef();
    const location = useLocation();
    React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(mainPanel.current);
            document.body.classList.toggle("perfect-scrollbar-on");
        }
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
                document.body.classList.toggle("perfect-scrollbar-on");
            }
        };
    });
    React.useEffect(() => {
        mainPanel.current.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [location]);
    const handleActiveClick = (color) => {
        setActiveColor(color);
    };
    const handleBgClick = (color) => {
        setBackgroundColor(color);
    };
    const handleSearchBarVal = (val) => {
        setSearchBarVal(val);
    };
    return (
        <>
            <div className="wrapper">
                <Sidebar
                    {...props}
                    routes={routes}
                    bgColor={backgroundColor}
                    activeColor={activeColor}
                />
                <div className="main-panel" ref={mainPanel}>
                    <TopNavbar {...props}
                               bgColor={backgroundColor}
                               activeColor={activeColor}
                               handleActiveClick={handleActiveClick}
                               handleBgClick={handleBgClick}
                               searchBarVal={searchBarVal}
                               handleSearchBarVal={handleSearchBarVal}
                    />
                    <Switch>
                        <Route
                            path={"/Cocktail/allcocktails"}
                            name={"All Cocktails"}
                            icon={"nc-icon nc-bank"}
                            layout={""}
                        >
                            <AllCocktails searchBarVal={searchBarVal}/>
                        </Route>
                        {routes.map((prop, key) => {
                            return (
                                <Route
                                    path={prop.layout + prop.path}
                                    component={prop.component}
                                    element={<prop.component
                                        bgColor={backgroundColor}
                                        activeColor={activeColor}
                                    />}
                                    key={key}
                                />
                            );
                        })}
                    </Switch>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
