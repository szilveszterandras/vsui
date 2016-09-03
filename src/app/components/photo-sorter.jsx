import React from "react";

const SORT = {
    AGE: 0,
    RATING: 1,
    NUMREV: 2
};
const SORT_CAPTIONS = {
    0: "Age",
    1: "Rating",
    2: "Number of reviews"
};

export default class PhotoSorter extends React.Component {
    static get SORT() {
        return SORT;
    }
    render() {
        const list = Object.keys(SORT).map(k => SORT[k]).map(sort => {
            const isActive = this.props.criteria === sort;
            const icon = isActive ?
                <i className={(this.props.direction > 0 ? "fa-arrow-up" : "fa-arrow-down") + " fa"} /> :
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
        let criteria = this.props.criteria;
        let direction = 1;
        if (this.props.criteria === sort) {
            direction = this.props.direction * -1;
        } else {
            criteria = sort;
        }
        this.props.onChange(criteria, direction);
    }
}
