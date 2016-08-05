import "../assets/css/vsui";

import Loglevel from "loglevel";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRedirect, hashHistory} from "react-router";
import MainPage from "components/main-page";
import LoginPage from "components/login-page";
import RegisterPage from "components/register-page";
import DashboardPage from "components/dashboard-page";
import UploadPage from "components/upload-page";
import PhotoPage from "components/photo-page";

window.logger = Loglevel;
window.logger.enableAll();

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={MainPage} >
            <IndexRedirect to="/dashboard" />
            <Route name="login" path="login" component={LoginPage} />
            <Route name="register" path="register" component={RegisterPage} />
            <Route name="dashboard" path="dashboard" component={DashboardPage}>
                <Route name="upload" path="upload" component={UploadPage} />
            </Route>
            <Route name="photo" path=":username/photo/:photoId" component={PhotoPage} />
        </Route>
    </Router>
), document.getElementById("root"));
