import React from "react";
import Session from "utils/session";
import EditComponent from "components/edit-component";
import Reviews from "components/reviews";

export default class PhotoPage extends React.Component {
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired
        };
    }
    constructor() {
        super();
        this.state = {
            photo: undefined,
            isMine: false,
            isEditOpen: false,
            isFullscreen: false
        };
        this.onEditClick = this.onEditClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }
    componentWillMount() {
        if (!Session.user) {
            return;
        }
        this._setPhoto(this.props);
    }
    componentWillReceiveProps(props) {
        this._setPhoto(props);
    }
    render() {
        if (!this.state.photo) {
            return <div className="spinner" />;
        }
        if (this.state.isFullscreen) {
            return (<div className="fullscreen">
                <img src={this.state.photo.get("path")} />
                <button onClick={() => this.setState({
                    isFullscreen: false
                })}>Smaller</button>
            </div>);
        }
        let content;
        let details;
        if (this.state.isMine) {
            content = this.state.isEditOpen ?
                <EditComponent photo={this.state.photo} onClose={() => {
                    this.setState({
                        isEditOpen: false
                    });
                }}/> :
                <div className="actions">
                    <button onClick={this.onEditClick}>Edit</button>
                    <button onClick={this.onDeleteClick}>Delete</button>
                </div>;
        } else {
            details = <div className="details">
                <h3>{this.state.photo.get("title")}</h3>
                <h5>{this.state.photo.get("description")}</h5>
                <div>{this.state.photo.get("tags").map(t => <span>#{t}</span>)}</div>
            </div>;
        }
        return <div className="photo-details">
            {details}
            <img src={this.state.photo.get("path")} />
            {content}

            <Reviews hash={this.state.photo.get("hash")} isMine={this.state.isMine} />
        </div>;
    }
    onEditClick() {
        this.setState({
            isEditOpen: true
        });
    }
    onDeleteClick() {
        Session.request("photo/delete", {
            id: this.state.photo.get("id")
        }, () => {
            this.context.router.goBack();
        });
    }
    _setPhoto(props) {
        const photo = props.photos.find(p =>
            p.get("hash") === props.params.photoHash);
        if (!photo) {
            return;
        }
        this.setState({
            photo,
            isMine: photo.get("username") === Session.user.get("username")
        });
    }
}
