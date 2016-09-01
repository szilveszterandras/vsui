import Immutable from "immutable";
import React from "react";
import ReviewService from "services/review-service";
import NewReview from "components/new-review";

export default class Reviews extends React.Component {
    constructor() {
        super();
        this.state = {
            reviews: Immutable.Map()
        };
    }
    componentWillMount() {
        this.reviewService = new ReviewService({
            hash: this.props.hash
        }, reviews => {
            this.setState({
                reviews
            });
        });
    }
    componentWillUnmount() {
        this.reviewService.destroy();
    }
    render() {
        const newReview = this.props.isMine ? undefined :
            <NewReview hash={this.props.hash} />;
        const reviews = this.state.reviews.toList().map(r => (<div key={r.get("id")} className="review">
            {r.get("title")} <br/>{r.get("description")}
        </div>));

        return (<div className="reviews">
            {newReview}
            {reviews}
        </div>);
    }
}
