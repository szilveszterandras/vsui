//import Immutable from "immutable";
import React from "react";
import DetailsEditor from "components/details-editor";
import Session from "utils/session";

export default class EditComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.photo.get("title"),
            description: props.photo.get("description"),
            tags: props.photo.get("tags")
        };
        this.onDetailsChange = this.onDetailsChange.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
    }
    render() {
        return (<div className="edit-section">
            <DetailsEditor
                title={this.state.title}
                description={this.state.description}
                tags={this.state.tags}
                onChange={this.onDetailsChange}/>
            <button onClick={this.onEditClick}>Edit</button>
            <button onClick={this.props.onClose}>Cancel</button>
        </div>);
    }
    onDetailsChange(data) {
        this.setState({
            title: data.title,
            description: data.description,
            tags: data.tags
        });
    }
    onEditClick() {
        Session.request("photo/update", {
            id: this.props.photo.get("id"),
            title: this.state.title,
            description: this.state.description,
            tags: this.state.tags.toJS()
        }, this.props.onClose);
    }
}
