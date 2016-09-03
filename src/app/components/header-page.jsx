import React from "react";
import SearchComponent from "components/search-component";
import Avatar from "components/avatar";

const STORAGE_KEY = "vsui_session_token";

export default class HeaderPage extends React.Component {
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired
        };
    }
    constructor() {
        super();
        this.state = {
            isMenuOpen: false
        };
        this.onClick = this.onClick.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.onDashboardClick = this.onDashboardClick.bind(this);
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
                <Avatar user={this.props.user} />
                <div className="caret no-flex">
                    <i className="fa fa-caret-down"/>
                </div>
                {this.state.isMenuOpen ?
                    <div className="user-menu">
                        <div onClick={this.onDashboardClick}>Dashboard</div>
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
    onDashboardClick() {
        this.context.router.push({
            pathname: "/dashboard"
        });
    }
    onLogout() {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
    }
}
