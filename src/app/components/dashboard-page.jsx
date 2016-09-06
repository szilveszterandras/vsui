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
            photos: Immutable.List(),
            stars: Immutable.List(),
            starredPhotos: Immutable.List(),
            newPhotos: Immutable.List(),
            trendingPhotos: Immutable.List(),
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
                photos: photos.toList()
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
        this.starredPhotosService = new PhotosService("photos/stream/starred", {
            username: Session.user.get("username")
        }, starredPhotos => {
            this.setState({
                starredPhotos: starredPhotos.toList()
            });
        }, () => this.setState({
            waiting: false
        }));
        this.newPhotosService = new PhotosService("photos/stream/new", {
            username: Session.user.get("username")
        }, newPhotos => {
            const list = newPhotos.toList();
            this.setState({
                newPhotos: list.sort((a, b) =>
                    b.get("uploadedAt") - a.get("uploadedAt")),
                trendingPhotos: list.sort((a, b) =>
                    b.get("reviewCount") - a.get("reviewCount"))
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
                photos={this.state.photos}
                stars={this.state.stars}
                onMore={this.onMyPhotos}/>
            <DashboardSection
                title="Starred by me"
                photos={this.state.starredPhotos}
                stars={this.state.stars}/>
            <DashboardSection
                title="New"
                photos={this.state.newPhotos}
                stars={this.state.stars}
                sortable={false} />
            <DashboardSection
                title="Trending"
                photos={this.state.trendingPhotos}
                stars={this.state.stars}
                sortable={false} />
        </div>);
    }
    componentWillUnmount() {
        if (!Session.user) {
            return;
        }
        this.photosService.destroy();
        this.starService.destroy();
        this.starredPhotosService.destroy();
        this.newPhotosService.destroy();
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
