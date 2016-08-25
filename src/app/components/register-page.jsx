import React from "react";
import Dropzone from "react-dropzone";
import Superagent from "superagent";
import Session from "utils/session";
import Globals from "utils/globals";

export default class RegisterPage extends React.Component {
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired
        };
    }
    constructor() {
        super();
        this.state = {
            file: undefined
        };
        this.onDrop = this.onDrop.bind(this);
        this.onRegisterClick = this.onRegisterClick.bind(this);
    }
    render() {
        const zone = this.state.file ?
            (<div className="preview avatar">
                <img src={this.state.file.preview} />
            </div>) :
            (<Dropzone className="dropzone" onDrop={this.onDrop}>
                <i className="fa fa-picture-o" />
            </Dropzone>);

        return <div className="form-default register dark">
            {zone}
            <h5>Avartar</h5>
            <div className="flex align-items-center">
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" ref="username" />
            </div>
            <div className="flex align-items-center">
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" ref="name" />
            </div>
            <div className="flex align-items-center">
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" ref="email" />
            </div>
            <div className="flex align-items-center">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" ref="password" />
            </div>
            <div className="flex justify-center">
                <button className="dark" onClick={this.onRegisterClick}>Register</button>
            </div>
        </div>;
    }
    onDrop(files) {
        this.setState({
            file: files[0]
        });
    }
    onRegisterClick() {
        this._uploadFile(this.state.file, hash => {
            this._registerUser(hash);
        });
    }
    _uploadFile(file, callback) {
        const req = Superagent.post("http://" + Globals.serverIp + ":" + Globals.imagePort + "/upload");
        req.attach(file.name, file);
        // TODO handle unhappy case
        req.end((err, resp) => {
            callback(resp.text);
        });
    }
    _registerUser(hash) {
        const payload = {
            username: this.refs.username.value,
            name: this.refs.name.value,
            email: this.refs.email.value,
            password: this.refs.password.value,
            avatar: hash
        };
        Session.request("user/new", payload, r => {
            if (r.get("isSuccess")) {
                this._login(this.refs.username.value,
                    this.refs.password.value);
            }
        });
    }
    _login(username, password) {
        Session.request("login", {
            username,
            password
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
