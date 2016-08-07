import React from "react";
import Session from "utils/session";
import PhotosService from "services/photos-service";

export default class PhotoPage extends React.Component {
    componentWillMount() {
        if (!Session.user) {
            return;
        }
        this.photosService = new PhotosService({
            username: this.props.params.username
        }, photos => {
            this.setState({
                photo: photos.find(p =>
                    p.get("hash") === this.props.params.photoHash)
            });
        }, () => this.setState({
            waiting: false
        }));
    }
    render() {
        return this.state.photo ?
            <img src={this.state.photo.get("path")} /> :
            <div>Loading...</div>;
    }
    componentWillUnmount() {
        if (!Session.user) {
            return;
        }
        this.photosService.destroy();
    }
}
