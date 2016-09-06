import React from "react";
import Immutable from "immutable";
import Session from "utils/session";
import PhotosService from "services/photos-service";
import StarService from "services/star-service";

export default class UserRoot extends React.Component {
    constructor() {
        super();
        this.state = {
            photos: Immutable.Map(),
            waiting: true
        };
    }
    componentWillMount() {
        this.bindServices(this.props.params.username);
    }
    componentWillReceiveProps(props) {
        if (props.params.username !== this.props.params.username) {
            this.unbindServices();
            this.bindServices(props.params.username);
        }
    }
    render() {
        return React.cloneElement(this.props.children, {
            photos: this.state.photos,
            stars: this.state.stars
        });
    }
    bindServices(username) {
        if (!Session.user) {
            return;
        }
        this.service = new PhotosService("photos/stream", {
            username
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
    unbindServices() {
        if (!Session.user) {
            return;
        }
        this.service.destroy();
        this.starService.destroy();
    }
    componentWillUnmount() {
        this.unbindServices();
    }
}
