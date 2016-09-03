import React from "react";
import Session from "utils/session";
import Reviews from "components/reviews";
import ImagePanel from "components/image-panel";
import EditComponent from "components/edit-component";

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
        this.onStarClick = this.onStarClick.bind(this);
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
        let actions = [];
        if (this.state.isMine && !this.state.isEditOpen) {
            actions = actions.concat([
                <i className="fa fa-pencil-square-o" onClick={this.onEditClick} />,
                <i className="fa fa-times" onClick={this.onDeleteClick} />]);
        }
        if (!this.state.isMine) {
            actions.push(<i className={"star fa " + (this.state.isStarred ?
                "fa-star active" : "fa-star-o")}
                onClick={this.onStarClick} />);
        }
        if (this.state.isFullscreen) {
            actions.push(<i className="fa fa-compress" onClick={() => this.setState({
                isFullscreen: false
            })} />);
        } else {
            actions.push(<i className="fa fa-expand" onClick={() => this.setState({
                isFullscreen: true
            })} />);
        }

        return <div className="photo-details">
            <div className="flex">
                <div>
                    <div className="photo">
                        <img src={this.state.photo.get("path")} />
                        <div className="actions">
                            {actions}
                        </div>
                    </div>
                    {this.state.isEditOpen ? <EditComponent photo={this.state.photo} onClose={() => this.setState({
                        isEditOpen: false
                    })} /> : undefined}
                </div>
                {this.state.isFullscreen ? undefined :
                    <ImagePanel {...this.state} />}
            </div>
            {this.state.isFullscreen || this.state.isEditOpen ? undefined :
                <Reviews hash={this.state.photo.get("hash")} isMine={this.state.isMine} />}
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
    onStarClick(e) {
        e.stopPropagation();
        Session.request(this.state.isStarred ? "star/delete" : "star/new", {
            hash: this.state.photo.get("hash")
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
            isMine: photo.get("user").get("username") === Session.user.get("username"),
            isStarred: props.stars.includes(photo.get("hash"))
        });
    }
}
