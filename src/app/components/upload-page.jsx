import React from "react";
import Dropzone from "react-dropzone";
import Superagent from "superagent";
import Session from "utils/session";

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
        return (<div>
            <Dropzone onDrop={this.onDrop}>
                <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" ref="title" />
            <br/>
            <label htmlFor="description">Description:</label>
            <textarea name="description" ref="description" />
            <button onClick={this.onUploadClick}>Upload</button>
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
            hash
        });
    }
}
