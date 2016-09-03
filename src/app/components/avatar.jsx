import React from "react";

export default class Avatar extends React.Component {
    render() {
        return <div className="avatar flex align-items-center">
            <img className="no-flex" src={this.props.user.get("avatar")} />
            <div className="person">
                <div className="name">{this.props.user.get("name")}</div>
                <div>{this.props.user.get("email")}</div>
                <div>@{this.props.user.get("username")}</div>
            </div>
        </div>;
    }
}
