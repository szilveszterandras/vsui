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

        this.starService = new StarService({
            username: this.props.params.username
        }, stars => {
            this.setState({
                stars
            });
        }, () => this.setState({
            waiting: false
        }));
    }
    render() {
        return React.cloneElement(this.props.children, {
            photos: this.state.photos,
            stars: this.state.stars
        });
    }
    componentWillUnmount() {
        if (!Session.user) {
            return;
        }
        this.service.destroy();
        this.starService.destroy();
    }
}
