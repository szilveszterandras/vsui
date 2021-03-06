import Immutable from "immutable";
import Rx from "rxjs";
import React from "react";
import SearchService from "services/search-service";

const TYPES = {
    USER: "users",
    TAG: "tags",
    PHOTO: "photos"
};

const UserResult = ({result, onClick}) => (
    <div className="search-user flex align-items-center" onClick={onClick}>
        <div className="thumbnail no-flex">
            <img src={result.get("avatar")} />
        </div>
        <div>
            <h3>@{result.get("username")}</h3>
            <h5>{result.get("name")}</h5>
        </div>
    </div>
);
const TagResult = ({result, onClick}) => (
    <div className="search-tag inline-block" onClick={onClick}>
        <h3>#{result.get("tag")} ({result.get("count")})</h3>
    </div>
);
const PhotoResult = ({result, onClick}) => (
    <div className="search-photo flex align-items-center" onClick={onClick}>
        <div className="thumbnail no-flex">
            <img src={result.get("path")} />
        </div>
        <div className="text">
            <h3>{result.get("title")}</h3>
            <h5>{result.get("description")}</h5>
        </div>
    </div>
);

export default class SearchComponent extends React.Component {
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired
        };
    }
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
                    return <UserResult key={r.get("id")} result={r} onClick={this.onItemClick.bind(this, r, TYPES.USER)} />;
                case TYPES.TAG:
                    return <TagResult key={r.get("tag")} result={r} onClick={this.onItemClick.bind(this, r, TYPES.TAG)} />;
                case TYPES.PHOTO:
                    return <PhotoResult key={r.get("id")} result={r} onClick={this.onItemClick.bind(this, r, TYPES.PHOTO)} />;
                }
            });
            results = (<div className={(this.state.type === TYPES.TAG ? "tags " : "") + "results"}>
                {items}
            </div>);
        }
        return <div className="search-bar relative">
            <div className="search-input flex align-items-center">
                <i className="fa fa-search no-flex" />
                <input type="text" ref="input" />
            </div>
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
                results: Immutable.List(),
                type: undefined
            });
        }

    }
    onItemClick(data, type) {
        switch (type) {
        case TYPES.USER:
            this.context.router.push({
                pathname: "/" + data.get("username") + "/photos"
            });
            break;
        case TYPES.TAG:
            this.context.router.push({
                pathname: "/search/" + data.get("tag")
            });
            break;
        case TYPES.PHOTO:
            this.context.router.push({
                pathname: "/" + data.get("user").get("username") + "/photo/" + data.get("hash")
            });
            break;
        }
        this.service.reset();
        this.setState({
            results: Immutable.List(),
            type: undefined
        });
    }
}
