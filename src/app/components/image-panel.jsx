import React from "react";

export default class ImagePanel extends React.Component {
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired
        };
    }
    render() {
        return <div className="image-panel no-flex">
                <h2>{this.props.photo.get("title")}</h2>
                <h5>by @{this.props.photo.get("user").get("username")}</h5>
                <p className="description">{this.props.photo.get("description")}</p>
                <div className="tags">{this.props.photo.get("tags").map(t => <span key={t} onClick={() => {
                    this.onTagClick(t);
                }}>#{t}</span>)}</div>
                {this.props.photo.get("rating") !== -1 ?
                    <p className="rating">{this.props.photo.get("rating")}% <span>(average rating)</span></p> :
                    undefined}
            </div>;
    }
    onTagClick(t) {
        this.context.router.push({
            pathname: "/search/" + t
        });
    }
}
