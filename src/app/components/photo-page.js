import React from 'react';

export default class PhotoPage extends React.Component {
    render() {
        console.log(' > Rendering...');
        return (<div>Photo page rendered, id: {this.props.params.photoId}</div>)
    }
}
