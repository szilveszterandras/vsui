import "../assets/css/vsui";

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, hashHistory } from 'react-router'
import PhotoPage from "components/photo-page";

ReactDOM.render((
    <Router history={hashHistory}>
        <Redirect from="/" to="user1/photo/asdasd" />
        <Route name="photo" path=":username/photo/:photoId" component={PhotoPage} />
    </Router>
), document.getElementById('root'));
//
//
// <DefaultRoute handler={PhotoPage} />
