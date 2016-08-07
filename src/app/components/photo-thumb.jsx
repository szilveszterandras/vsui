import React from "react";
import Session from "utils/session";

export default class PhotoThumb extends React.Component {
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired
        };
    }
    constructor() {
        super();
        this.state = {
            loaded: false
        };
        this.onLoad = this.onLoad.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onStarClick = this.onStarClick.bind(this);
    }
    render() {
        const starIcon = this.props.isStarrable ?
            <i className={"star fa " + (this.props.isStarred ?
                "fa-star active" : "fa-star-o")}
                onClick={this.onStarClick} /> :
            undefined;
        const style = {
            display: this.state.loaded ? "block" : "none"
        };
        return (<div className="photo-thumb" style={style}
            onClick={this.onClick}>
            <img src={this.props.photo.get("path")}
                onLoad={this.onLoad} />
            {starIcon}
            <div className="title">{this.props.photo.get("title")}</div>
        </div>);
    }
    onLoad() {
        this.setState({
            loaded: true
        });
    }
    onClick() {
        this.context.router.push({
            pathname: "/" + this.props.photo.get("username") +
                "/photo/" + this.props.photo.get("hash")
        });
    }
    onStarClick() {
        Session.request(this.props.isStarred ? "star/delete" : "star/new", {
            hash: this.props.photo.get("hash")
        });
    }
}
