import React from "react";
import Session from "utils/session";

export default class PhotoPage extends React.Component {
    render() {
        console.log(" > Rendering...");
        return (<div>Photo page rendered, id: {this.props.params.photoId}</div>);
    }
}
