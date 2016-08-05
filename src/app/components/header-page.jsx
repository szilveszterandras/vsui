import React from "react";

export default class HeaderPage extends React.Component {
    render() {
        return (<header className="header-page">
            <div className="user flex">
                <div className="no-flex">
                    <img src={this.props.user.avatar} />
                </div>
                <div>
                    <div>{this.props.user.name}</div>
                    <div>{this.props.user.username}</div>
                </div>
                <div className="no-flex">>></div>
            </div>
        </header>);
    }
}
