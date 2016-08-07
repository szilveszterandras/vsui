import Immutable from "immutable";
import React from "react";
import Session from "utils/session";
import PhotosService from "services/photos-service";
import DashboardSection from "components/dashboard-section";

export default class PhotosPage extends React.Component {
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired
        };
    }
    constructor() {
        super();
        this.state = {
            photos: Immutable.Map(),
            waiting: true
        };
    }
    componentWillMount() {
        if (!Session.user) {
            return;
        }
        this.service = new PhotosService({
            username: this.props.params.username
        }, photos => {
            this.setState({
                photos
            });
        }, () => this.setState({
            waiting: false
        }));
    }
    render() {
        return (<div className="dashboard">
        <DashboardSection
            title={"@" + this.props.params.username + "\'s photos"}
            photos={this.state.photos.toList()} />
        </div>);
    }
    componentWillUnmount() {
        if (!Session.user) {
            return;
        }
        this.service.destroy();
    }
}
