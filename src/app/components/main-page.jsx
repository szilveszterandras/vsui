import React from "react";
import Globals from "utils/globals";
import Session from "utils/session";
import HeaderPage from "components/header-page";

export default class MainPage extends React.Component {
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired
        };
    }
    constructor() {
        super();
        this.state = {
            sessionState: Session.STATE.DISCONNECTED,
            message: "Connecting to server..."
        };

        Session.start({
            host: Globals.serverIp,
            port: Globals.websocketPort,
            onStateChange: this.onStateChange.bind(this)
        });
    }
    render() {
        const overlay = this.state.sessionState === Session.STATE.DISCONNECTED ?
            (<div className="session-overlay">
                <div className="spinner" />
                <div>{this.state.message}</div>
            </div>) :
            undefined;
        const header = this.state.sessionState === Session.STATE.CONNECTED ?
            (<HeaderPage user={Session.user} />) :
            undefined;
        return (<div className="main-page">
            {header}
            {this.state.sessionState !== Session.STATE.DISCONNECTED ?
                this.props.children : overlay}
        </div>);
    }
    onStateChange(sessionState, code) {
        if (sessionState === Session.STATE.INVALID) {
            this.context.router.push({
                pathname: "/login"
            });
        }
        const message = code === Session.MESSAGE.DISCONNECTED ?
            "Lost connection to server, trying to reconnect..." : undefined;
        this.setState({
            sessionState,
            message
        });
    }
}
