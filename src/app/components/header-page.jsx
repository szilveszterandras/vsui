import React from "react";
import SearchComponent from "components/search-component";

const STORAGE_KEY = "vsui_session_token";

export default class HeaderPage extends React.Component {
    constructor() {
        super();
        this.state = {
            isMenuOpen: false
        };
        this.onClick = this.onClick.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }
    render() {
        return (<header className="header-page">
            <SearchComponent />
            <div className="user flex align-items-center relative"
                onClick={this.onClick} >
                <div className="avatar no-flex">
                    <img src={this.props.user.get("avatar")} />
                </div>
                <div className="person no-flex">
                    <div className="name">{this.props.user.get("name")}</div>
                    <div>{this.props.user.get("email")}</div>
                    <div>@{this.props.user.get("username")}</div>
                </div>
                <div className="caret no-flex">
                    <i className="fa fa-caret-down"/>
                </div>
                {this.state.isMenuOpen ?
                    <div className="logout absolute"
                        onClick={this.onLogout}>Logout</div> :
                    undefined}
            </div>
        </header>);
    }
    onClick() {
        this.setState({
            isMenuOpen: true
        });
    }
    onLogout() {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
    }
}
