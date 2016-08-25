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
        this.onDocumentClick = this.onDocumentClick.bind(this);
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.onDocumentClick, false);
    }
    render() {
        let userClass = "user flex no-flex align-items-center relative";
        if (this.state.isMenuOpen) {
            userClass += " open";
        }
        return (<header className="header-page flex align-items-center">
            <div>
                <SearchComponent />
            </div>
            <div className={userClass}
                onClick={this.onClick} >
                <div className="avatar no-flex">
                    <img src={this.props.user.get("avatar")} />
                </div>
                <div className="person">
                    <div className="name">{this.props.user.get("name")}</div>
                    <div>{this.props.user.get("email")}</div>
                    <div>@{this.props.user.get("username")}</div>
                </div>
                <div className="caret no-flex">
                    <i className="fa fa-caret-down"/>
                </div>
                {this.state.isMenuOpen ?
                    <div className="user-menu">
                        <div onClick={this.onLogout}>Logout</div>
                    </div> :
                    undefined}
            </div>
        </header>);
    }
    onClick() {
        this.setState({
            isMenuOpen: true
        });
        document.addEventListener("click", this.onDocumentClick, false);
    }
    onDocumentClick() {
        document.removeEventListener("click", this.onDocumentClick, false);
        this.setState({
            isMenuOpen: false
        });
    }
    onLogout() {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
    }
}
