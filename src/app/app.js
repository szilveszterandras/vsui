import "../assets/css/vsui";

import Loglevel from "loglevel";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRedirect, hashHistory} from "react-router";
import Session from "utils/session";
import MainPage from "components/main-page";
import LoginPage from "components/login-page";
import RegisterPage from "components/register-page";
import DashboardPage from "components/dashboard-page";
import UserRoot from "components/user-root";
import PhotosPage from "components/photos-page";
import PhotoPage from "components/photo-page";
import PhotosByTagPage from "components/photos-by-tag-page";

window.logger = Loglevel;
window.logger.enableAll();

const auth = (props, replace) => {
    if (Session.state === Session.STATE.INVALID) {
        replace({
            pathname: "/login",
            state: {
                nextPathname: props.location.pathname
            }
        });
    }
};

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={MainPage} >
            <IndexRedirect to="/dashboard" />
            <Route name="login" path="login" component={LoginPage} />
            <Route name="register" path="register" component={RegisterPage} />
            <Route name="dashboard" path="dashboard" component={DashboardPage} onEnter={auth}/>
            <Route name="userRoot" path=":username" component={UserRoot} onEnter={auth}>
                <Route name="photos" path="photos" component={PhotosPage} />
                <Route name="photo" path="photo/:photoHash" component={PhotoPage} />
            </Route>
            <Route name="byTags" path="search/:tag" component={PhotosByTagPage} onEnter={auth}/>
        </Route>
    </Router>
), document.getElementById("root"));
