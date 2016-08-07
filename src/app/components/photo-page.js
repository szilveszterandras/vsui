import React from "react";
import Session from "utils/session";
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
            isEditOpen: false
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
            return <div>LOADING...</div>;
        }
        const edit = this.state.isEditOpen ?
            <EditComponent photo={this.state.photo} onClose={() => {
                this.setState({
                    isEditOpen: false
                });
            }}/> :
            undefined;
        const content = this.state.isMine && !this.state.isEditOpen ?
            <div className="actions">
                <button onClick={this.onEditClick}>Edit</button>
                <button onClick={this.onDeleteClick}>Delete</button>
            </div> : <div> OTHER's PHOTO</div>;

        return <div className="photo-details">
            <img src={this.state.photo.get("path")} />
            {edit}
            {content}
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
