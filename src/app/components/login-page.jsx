import React from "react";
import Session from "utils/session";

export default class LoginPage extends React.Component {
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired
        };
    }
    constructor() {
        super();
        this.onLoginClick = this.onLoginClick.bind(this);
    }
    render() {
        return (<div className="form-default login dark">
            <div className="flex align-items-center">
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" ref="username" />
            </div>
            <div className="flex align-items-center">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" ref="password" />
            </div>
            <div className="flex justify-center">
                <button className="dark" onClick={this.onLoginClick}>Log in</button>
                <button className="dark" onClick={() => this.context.router.push({
                    pathname: "/register"
                })}>Register</button>
            </div>
        </div>);
    }
    onLoginClick() {
        Session.request("login", {
            username: this.refs.username.value,
            password: this.refs.password.value
        }, r => {
            // TODO handle fail
            if (r.has("token")) {
                Session.onLogin(r.get("token"), r.get("user"));
                this.context.router.push({
                    pathname: "/dashboard"
                });
            }
        });
    }
}
