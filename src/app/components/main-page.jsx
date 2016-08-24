import React from "react";
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
            message: undefined
        };
        this.initSession();
    }
    componentWillReceiveProps(props) {
        if (props.location.pathname !== this.props.location.pathname) {
            this.authorize(props.location.pathname);
        }
    }
    render() {
        const overlay = this.state.sessionState === Session.STATE.DISCONNECTED ?
            (<div className="session-overlay">Session Disconnected</div>) :
            undefined;
        const header = this.state.sessionState === Session.STATE.CONNECTED ?
            (<HeaderPage user={Session.user} />) : undefined;
        return (<div className="main-page">
            {header}
            {this.state.sessionState !== Session.STATE.DISCONNECTED ?
                this.props.children : overlay}
        </div>);
    }
    initSession() {
        Session.start({
            host: "130.211.52.109",
            port: 9092,
            onStateChange: this.onStateChange.bind(this)
        });
    }
    onStateChange(sessionState, message) {
        this.setState({
            sessionState,
            message
        });
        this.authorize(this.props.location.pathname);
    }
    authorize(pathname) {
        if (this.state.sessionState === Session.STATE.INVALID &&
            pathname !== "/login" &&
            pathname !== "/register") {

            this.context.router.push({
                pathname: "/login"
            });
        }
    }
}
