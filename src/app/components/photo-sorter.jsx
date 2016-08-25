import React from "react";

const SORT = {
    NEWEST: 0,
    OLDEST: 1,
    HIGHEST_RATED: 2,
    LOWEST_RATED: 3,
    MOST_REVIEWS: 4,
    FEWEST_REVIEWS: 5
};
const SORT_CAPTIONS = {
    0: "Newest",
    1: "Oldest",
    2: "Highest Rated",
    3: "Lowest Rated",
    4: "Most Reviews",
    5: "Fewest Reviews"
};

export default class PhotoSorter extends React.Component {
    static get SORT() {
        return SORT;
    }
    constructor() {
        super();
        this.state = {
            isOpen: false
        };
        this.onItemClick = this.onItemClick.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.onDocumentClick, false);
    }
    render() {
        let list = [(<div onClick={this.onItemClick.bind(this, this.props.value)}>
            {SORT_CAPTIONS[this.props.value]}
        </div>)];
        if (this.state.isOpen) {
            Object.keys(SORT_CAPTIONS).forEach(key => {
                if (key !== this.props.value.toString()) {
                    list.push(<div onClick={this.onItemClick.bind(this, key)}>
                        {SORT_CAPTIONS[key]}</div>);
                }
            });
        }
        return (<div className={"sorter relative" + (this.state.isOpen ? " open" : "")}>
            <div className="list absolute">
                {list}
            </div>
        </div>);
    }
    onItemClick(value) {
        if (!this.state.isOpen) {
            document.addEventListener("click", this.onDocumentClick, false);
            this.setState({
                isOpen: true
            });
            return;
        }
        if (value !== this.props.value) {
            this.props.onChange(value);
        }
    }
    onDocumentClick() {
        document.removeEventListener("click", this.onDocumentClick, false);
        this.setState({
            isOpen: false
        });
    }
}
