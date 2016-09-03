import React from "react";
import Session from "utils/session";
import PhotoThumb from "components/photo-thumb";

export default class VerticalGallery extends React.Component {
    render() {
        const columns = [];
        for (let i = 0; i < this.props.columns; i++) {
            columns[i] = [];
        };
        this.props.photos.forEach((photo, i) => {
            columns[i % this.props.columns].push(photo);
        });
        return (<div className="vertical-gallery flex">
            {columns.map((column, key) =>
                this.renderColumn(column, key))}
            </div>);
    }
    renderColumn(column, key) {
        return (<div key={key} className="column">
            {column.map(photo =>
                <PhotoThumb key={photo.get("id")} photo={photo}
                    isMine={photo.get("user").get("username") === Session.user.get("username")}
                    isStarred={this.props.stars.includes(photo.get("hash"))}
                />)}
        </div>);
    }
}
