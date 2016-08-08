import Immutable from "immutable";
import React from "react";
import Session from "utils/session";
import PhotosService from "services/photos-service";
import StarService from "services/star-service";
import Upload from "components/upload-component";
import DashboardSection from "components/dashboard-section";

export default class DashboardPage extends React.Component {
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired
        };
    }
    constructor() {
        super();
        this.state = {
            photos: Immutable.Map(),
            stars: Immutable.List(),
            waiting: true,
            isUploadOpen: false
        };
        this.onMyPhotos = this.onMyPhotos.bind(this);
    }
    componentWillMount() {
        if (!Session.user) {
            return;
        }
        this.photosService = new PhotosService("photos/stream", {
            username: Session.user.get("username")
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
        return (<div className="dashboard">
            {this.state.isUploadOpen ?
                <Upload tags={this.state.tags}
                    onClose={this.toggleUpload.bind(this, false)} /> :
                (<div className="text-center">
                    <button className="large" onClick={this.toggleUpload.bind(this, true)}>
                        <i className="fa fa-arrow-circle-up"/> Upload
                    </button>
                </div>)}


            <DashboardSection
                title="My Photos"
                maxCount={8}
                photos={this.state.photos.toList()}
                stars={this.state.stars}
                onMore={this.onMyPhotos}/>
        </div>);
    }
    componentWillUnmount() {
        if (!Session.user) {
            return;
        }
        this.photosService.destroy();
        this.starService.destroy();
    }
    toggleUpload(isUploadOpen) {
        this.setState({
            isUploadOpen
        });
    }
    onMyPhotos() {
        this.context.router.push({
            pathname: "/" + Session.user.get("username") + "/photos"
        });
    }
}
