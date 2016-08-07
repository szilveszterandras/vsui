import React from "react";
import SearchComponent from "components/search-component";

export default class HeaderPage extends React.Component {
    render() {
        return (<header className="header-page">
            <SearchComponent />
            <div className="user flex align-items-center">
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
            </div>
        </header>);
    }
}
