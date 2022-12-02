import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import MainLayout from "layouts/Dashboard.js";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/Cocktail" render={(props)  => <MainLayout {...props} search="" />}/>
            <Redirect to={{
                pathname: "/Cocktail/allcocktails"
            }}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
