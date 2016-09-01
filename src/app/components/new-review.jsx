import React from "react";
import Session from "utils/session";

export default class NewReview extends React.Component {
    constructor() {
        super();
        this.onAddReview = this.onAddReview.bind(this);
    }
    render() {
        return <div className="new-review">
            <label>Summary: </label>
            <input type="text" ref="summary" />
            <br/>
            <label>Details: </label>
            <input type="text" ref="details" />
            <br/>
            <label>Score: </label>
            <input type="number" ref="score" />
            <button onClick={this.onAddReview}>Submit Review</button>
        </div>;
    }
    onAddReview() {
        Session.request("review/new", {
            hash: this.props.hash,
            title: this.refs.summary.value,
            description: this.refs.details.value,
            rating: this.refs.score.value
        });
    }
}
