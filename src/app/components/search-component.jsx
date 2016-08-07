import Immutable from "immutable";
import Rx from "rxjs";
import React from "react";
import SearchService from "services/search-service";

const TYPES = {
    USER: "users",
    TAG: "tags",
    PHOTO: "photos"
};

const UserResult = ({result}) => (
    <div className="search-user">{result.get("username")}</div>
);
const TagResult = ({result}) => (
    <div className="search-tag">{result.get("tag")}</div>
);
const PhotoResult = ({result}) => (
    <div className="search-photo">{result.get("title")}</div>
);

// const componentMap = {
//     1: UserResults,
//     2: TagResults,
//     3: PhotoResults
// };

export default class SearchComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            results: Immutable.List(),
            term: "",
            type: undefined
        };
    }
    componentWillMount() {
        this.service = new SearchService(results => {
            this.setState({
                results
            });
        });
    }
    componentDidMount() {
        Rx.Observable.fromEvent(this.refs.input, "keyup")
            .debounceTime(200)
            .map(() => this.refs.input.value)
            .subscribe(this.onKeyup.bind(this));
    }
    componentWillUnmount() {
        this.service.destroy();
    }
    render() {
        let results;
        if (this.state.type) {
            const items = this.state.results.map(r => {
                switch (this.state.type) {
                case TYPES.USER:
                    return <UserResult result={r} onClick={this.onItemClick} />;
                case TYPES.TAG:
                    return <TagResult result={r} onClick={this.onItemClick} />;
                case TYPES.PHOTO:
                    return <PhotoResult result={r} onClick={this.onItemClick} />;
                }
            });
            results = (<div className="results">
                {items}
            </div>);
        }
        return <div className="search-bar">
            <i className="fa fa-search" />
            <input type="text" ref="input" />
            {results}
        </div>;
    }
    onKeyup(value) {
        let type;
        let term;
        switch(value[0]) {
        case undefined:
            type = undefined;
            term = "";
            break;
        case "@":
            type = TYPES.USER;
            term = value.slice(1);
            break;
        case "#":
            type = TYPES.TAG;
            term = value.slice(1);
            break;
        default:
            type = TYPES.PHOTO;
            term = value;
        }
        this.setState({
            term,
            type
        });
        if (type) {
            this.service.search(type, {
                term
            });
        } else {
            this.service.reset();
            this.setState({
                results: Immutable.List()
            });
        }

    }
    onItemClick() {
        debugger;
    }
}
