import Immutable from "immutable";
import React from "react";
import Session from "utils/session";
import PhotosService from "services/photos-service";
import StarService from "services/star-service";
import DashboardSection from "components/dashboard-section";

export default class PhotosByTagPage extends React.Component {
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
        this.service = new PhotosService("photosByTag/stream", {
            tag: this.props.params.tag
        }, photos => {
            this.setState({
                photos
            });
        }, () => this.setState({
            waiting: false
        }));
        this.starService = new StarService({
            username: Session.user.get("username")
        }, stars => {
            this.setState({
                stars
            });
        }, () => this.setState({
            waiting: false
        }));
    }
    render() {
        return (<div className="photos-by-tag">
        <DashboardSection
            title={"Results for #" + this.props.params.tag}
            photos={this.state.photos.toList()}
            stars={this.state.stars}/>
        </div>);
    }
    componentWillUnmount() {
        if (!Session.user) {
            return;
        }
        this.service.destroy();
        this.starService.destroy();
    }
}
