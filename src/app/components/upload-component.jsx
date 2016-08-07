import Immutable from "immutable";
import React from "react";
import Dropzone from "react-dropzone";
import Superagent from "superagent";
import Session from "utils/session";
import DetailsEditor from "components/details-editor";

export default class UploadPage extends React.Component {
    constructor() {
        super();
        this.state = {
            file: undefined,
            title: "",
            description: "",
            tags: Immutable.List()
        };
        this.onDrop = this.onDrop.bind(this);
        this.onUploadClick = this.onUploadClick.bind(this);
        this.onDetailsChange = this.onDetailsChange.bind(this);
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
            <DetailsEditor
                title={this.state.title}
                description={this.state.description}
                tags={this.state.tags}
                onChange={this.onDetailsChange}/>
            <button onClick={this.onUploadClick}>Upload</button>
            <button onClick={this.props.onClose}>Cancel</button>
        </div>);
    }
    onDrop(files) {
        this.setState({
            file: files[0]
        });
    }
    onDetailsChange(data) {
        this.setState({
            title: data.title,
            description: data.description,
            tags: data.tags
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
            title: this.state.title,
            description: this.state.description,
            //tags: this.refs.tagEditor.getTags(),
            tags: this.state.tags,
            hash
        }, () => {
            // TODO handle error case
            this.props.onClose();
        });
    }
}
