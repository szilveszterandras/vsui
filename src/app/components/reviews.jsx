import Immutable from "immutable";
import React from "react";
import moment from "moment";
import ReviewService from "services/review-service";
import NewReview from "components/new-review";

const SORT = {
    AGE: "a",
    RATING: "r",
    TITLE: "t"
};
const SORT_CAPTIONS = {
    "a": "Age",
    "r": "Rating",
    "t": "Title"
};

export default class Reviews extends React.Component {
    constructor() {
        super();
        this.state = {
            reviews: Immutable.Map(),
            isNewReviewOpen: false,
            sortCriteria: SORT.AGE,
            sortDirection: 1
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
        let newReview;
        if (!this.props.isMine) {
            newReview = this.state.isNewReviewOpen ?
                <NewReview hash={this.props.hash} onClose={() => this.setState({
                    isNewReviewOpen: false
                })}/> :
                <button onClick={() => this.setState({
                    isNewReviewOpen: true
                })}><i className="fa fa-pencil" /> Write Review</button>;
        }
        if (this.state.reviews.count() === 0) {
            return <div className="reviews">
                {newReview}
            </div>;
        }
        const sort = this.renderSort();
        const reviews = this.state.reviews.toList()
            .sort((a, b) => {
                let ret;
                switch (this.state.sortCriteria) {
                case SORT.AGE:
                    ret = a.get("addedAt") - b.get("addedAt");
                    break;
                case SORT.RATING:
                    ret = a.get("rating") - b.get("rating");
                    break;
                case SORT.TITLE:
                    ret = a.get("title").localeCompare(b.get("title"));
                    break;
                default:
                    ret = 0;
                };
                return ret * this.state.sortDirection;
            })
            .map(r => (
                <div key={r.get("id")} className="review flex">
                    <div className={"rating no-flex rating-" + Math.floor(r.get("rating") / 10)}>
                        <h1>{r.get("rating")}%</h1>
                        <h5>by @{r.get("username")}</h5>
                        <h5>{moment(r.get("addedAt")).format("DD/MM/YYYY")}</h5>
                    </div>
                    <div>
                        <h3>{r.get("title")}</h3>
                        <p>{r.get("description")}</p>
                    </div>
                </div>));

        return (<div className="reviews">
            <h2>Reviews:</h2>
            {newReview}
            {sort}
            {reviews}
        </div>);
    }
    renderSort() {
        const list = Object.keys(SORT_CAPTIONS).map(sort => {
            const isActive = this.state.sortCriteria === sort;
            const icon = isActive ?
                <i className={(this.state.sortDirection > 0 ? "fa-arrow-up" : "fa-arrow-down") + " fa"} /> :
                undefined;
            return <span className={isActive ? "active" : ""} onClick={() => this.onSortClick(sort)}>
                {SORT_CAPTIONS[sort]} {icon}</span>;
        });
        return <div className="sort">
            <span>Sort by: </span>
            {list}
        </div>;
    }
    onSortClick(sort) {
        if (this.state.sortCriteria === sort) {
            this.setState({
                sortDirection: this.state.sortDirection * -1
            });
        } else {
            this.setState({
                sortCriteria: sort,
                sortDirection: 1
            });
        }
    }
}
