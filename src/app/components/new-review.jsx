import React from "react";
import Session from "utils/session";

export default class NewReview extends React.Component {
    constructor() {
        super();
        this.onAddReview = this.onAddReview.bind(this);
    }
    render() {
        return <div className="new-review">
            <div className="flex align-items-center new-rating">
                <label>Score: </label>
                <input type="number" min="0" max="100" step="1" ref="score" />
            </div>
            <div className="flex align-items-center">
                <label>Summary: </label>
                <input type="text" ref="summary" />
            </div>
            <div className="flex align-items-center">
                <label>Details: </label>
                <input type="text" ref="details" />
            </div>

            <button onClick={this.onAddReview}>Submit Review</button>
            <button onClick={this.props.onClose}>Cancel</button>
        </div>;
    }
    onAddReview() {
        Session.request("review/new", {
            hash: this.props.hash,
            title: this.refs.summary.value,
            description: this.refs.details.value,
            rating: this.refs.score.value
        }, this.props.onClose);
    }
}
