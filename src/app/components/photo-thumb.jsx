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
        this.onUsernameClick = this.onUsernameClick.bind(this);
    }
    render() {
        const starIcon = !this.props.isMine ?
            <i className={"star fa " + (this.props.isStarred ?
                "fa-star active" : "fa-star-o")}
                onClick={this.onStarClick} /> :
            undefined;
        const style = {
            display: this.state.loaded ? "block" : "none"
        };
        const rating = this.props.photo.get("rating") !== -1 ? <p>{this.props.photo.get("rating")}%</p> : undefined;
        return (<div className="photo-thumb" style={style}
            onClick={this.onClick}>
            <div className="image">
                <img src={this.props.photo.get("path")}
                    onLoad={this.onLoad} />
            </div>
            {starIcon}
            <div className="title flex align-items-center">
                <div>
                    <h4>{this.props.photo.get("title")}</h4>
                    <h5 onClick={this.onUsernameClick}>@{this.props.photo.get("user").get("username")}</h5>
                </div>
                {rating}
            </div>
        </div>);
    }
    onLoad() {
        this.setState({
            loaded: true
        });
    }
    onClick() {
        this.context.router.push({
            pathname: "/" + this.props.photo.get("user").get("username") +
                "/photo/" + this.props.photo.get("hash")
        });
    }
    onStarClick(e) {
        e.stopPropagation();
        Session.request(this.props.isStarred ? "star/delete" : "star/new", {
            hash: this.props.photo.get("hash")
        });
    }
    onUsernameClick(e) {
        e.stopPropagation();
        this.context.router.push({
            pathname: "/" + this.props.photo.get("user").get("username")
        });
    }
}
