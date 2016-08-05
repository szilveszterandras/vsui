import React from "react";

export default class DashboardPage extends React.Component {
    render() {
        return (<div className="dashboard">
            DASHBOARD
            {this.props.children}
        </div>);
    }
}
