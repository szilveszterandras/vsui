import React from "react";
import Dropzone from "react-dropzone";
import Superagent from "superagent";
import Session from "utils/session";
import TagEditor from "components/tag-editor";

export default class UploadPage extends React.Component {
    constructor() {
        super();
        this.state = {
            file: undefined
        };
        this.onDrop = this.onDrop.bind(this);
        this.onUploadClick = this.onUploadClick.bind(this);
    }
    render() {
        const zone = this.state.file ?
            (<div className="preview">
                <img src={this.state.file.preview} />
            </div>) :
            (<Dropzone className="dropzone" onDrop={this.onDrop}>
                <i className="fa fa-picture-o" />
            </Dropzone>);

        return (<div className="upload-section">
            {zone}
            <div className="form-section title">
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" ref="title" />
            </div>
            <div className="form-section">
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" ref="description" />
            </div>
            <TagEditor tags={this.props.tags} />
            <button onClick={this.onUploadClick}>Upload</button>
            <button onClick={this.props.onClose}>Cancel</button>
        </div>);
    }
    onDrop(files) {
        this.setState({
            file: files[0]
        });
    }
    onUploadClick() {
        const req = Superagent.post("http://localhost:9093/upload");
        req.attach(this.state.file.name, this.state.file);
        // TODO handle unhappy case
        req.end((err, resp) => {
            this.upload(resp.text);
        });
    }
    upload(hash) {
        Session.request("photo/new", {
            title: this.refs.title.value,
            description: this.refs.description.value,
            tags: this.refs.tagEditor.getTags(),
            hash
        }, () => {
            // TODO handle error case
            this.props.onClose();
        });
    }
}
