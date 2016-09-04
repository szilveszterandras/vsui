import React from "react";
import VerticalGallery from "components/vertical-gallery";
import PhotoSorter from "components/photo-sorter";

export default class DashboardSection extends React.Component {
    constructor() {
        super();
        this.state = {
            sortCriteria: PhotoSorter.SORT.AGE,
            sortDirection: 1
        };
        this.onSortChange = this.onSortChange.bind(this);
        this.doSort = this.doSort.bind(this);
    }
    render() {
        let photos = this.props.photos;
        if (this.props.sortable !== false) {
            photos = photos.sort(this.doSort);
        }
        photos = photos.take(this.props.maxCount || Infinity);
        const sorter = this.props.sortable === false ? undefined :
            <PhotoSorter onChange={this.onSortChange}
                criteria={this.state.sortCriteria} direction={this.state.sortDirection}/>;
        return <div className="dashboard-section">
            <h2>{this.props.title}
                {sorter}
            </h2>
            <VerticalGallery
                photos={photos}
                stars={this.props.stars}
                columns={4}/>
            {this.props.photos.count() > (this.props.maxCount || Infinity) ?
                (<button className="more" onClick={this.props.onMore}>
                    More <i className="fa fa-caret-right" />
                </button>) :
                undefined}
        </div>;
    }
    onSortChange(sortCriteria, sortDirection) {
        this.setState({
            sortCriteria,
            sortDirection
        });
    }
    doSort(a, b) {
        let ret;
        switch (this.state.sortCriteria) {
        case PhotoSorter.SORT.AGE:
            ret = a.get("uploadedAt") - b.get("uploadedAt");
            break;
        case PhotoSorter.SORT.RATING:
            ret = a.get("rating") - b.get("rating");
            break;
        case PhotoSorter.SORT.NUMREV:
            ret = a.get("reviewCount") - b.get("reviewCount");
            break;
        default:
            ret = 0;
        }
        return ret * this.state.sortDirection;
    }
}
