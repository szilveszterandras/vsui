import React from "react";
import VerticalGallery from "components/vertical-gallery";
import PhotoSorter from "components/photo-sorter";

export default class DashboardSection extends React.Component {
    constructor() {
        super();
        this.state = {
            sortValue: PhotoSorter.SORT.NEWEST
        };
        this._generateSorters();
        this.onSortChange = this.onSortChange.bind(this);
    }
    render() {
        const photos = this.props.photos
            .sort(this.sorters[this.state.sortValue])
            .take(this.props.maxCount || Infinity);
        return <div className="dashboard-section">
            <h2>{this.props.title}
                <PhotoSorter onChange={this.onSortChange}
                    value={this.state.sortValue}/>
            </h2>
            <VerticalGallery
                photos={photos}
                columns={4}/>
            {this.props.photos.count() > (this.props.maxCount || Infinity) ?
                (<button className="more" onClick={this.props.onMore}>
                    More <i className="fa fa-caret-right" />
                </button>) :
                undefined}
        </div>;
    }
    onSortChange(sortValue) {
        this.setState({
            sortValue
        });
    }
    _generateSorters() {
        this.sorters = {};
        this.sorters[PhotoSorter.SORT.NEWEST] = (a, b) =>
            b.get("uploadedAt") - a.get("uploadedAt");
        this.sorters[PhotoSorter.SORT.OLDEST] = (a, b) =>
            a.get("uploadedAt") - b.get("uploadedAt");

        this.sorters[PhotoSorter.SORT.HIGHEST_RATED] = (a, b) => {
            return 0;
        };
        this.sorters[PhotoSorter.SORT.LOWEST_RATED] = (a, b) => {
            return 0;
        };
        this.sorters[PhotoSorter.SORT.MOST_REVIEWS] = (a, b) => {
            return 0;
        };
        this.sorters[PhotoSorter.SORT.FEWEST_REVIEWS] = (a, b) => {
            return 0;
        };
    }
}
