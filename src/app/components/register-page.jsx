import React from "react";
import Dropzone from "react-dropzone";
import Superagent from "superagent";
import Session from "utils/session";

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
        return <div>
            Register page

            <Dropzone onDrop={this.onDrop}>
                <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>

            <label htmlFor="username">Username:</label>
            <input type="text" name="username" ref="username" />
            <br/>
            <label htmlFor="name">Name:</label>
            <textarea name="name" ref="name" />
            <br/>
            <label htmlFor="email">Email:</label>
            <textarea name="email" ref="email" />
            <br/>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" ref="password" />
            <button onClick={this.onRegisterClick}>Upload</button>
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
        const req = Superagent.post("http://localhost:9093/upload");
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
            if (r.isSuccess) {
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
            if (r.token) {
                Session.onLogin(r.token, r.user);
                this.context.router.push({
                    pathname: "/dashboard"
                });
            }
        });
    }
}
