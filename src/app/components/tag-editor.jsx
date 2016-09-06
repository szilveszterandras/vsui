import React from "react";
import Rx from "rxjs";
import TagService from "services/tag-service";

export default class TagEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            prevValue: ""
        };
        this.regex = /^#[a-zA-Z][a-zA-Z\-]+[a-zA-Z]$/;

    }
    componentWillMount() {
        this.tagService = new TagService({}, allTags => {
            this.setState({
                allTags
            });
        });
    }
    componentDidMount() {
        this.sub = Rx.Observable.fromEvent(this.refs.tagInput, "keyup")
            //.throttle(500)
            .subscribe(this.onKeyup.bind(this));
    }
    render() {
        return <div className="tag-editor">
            {this.props.tags.map(t =>
                <span key={t} className="tag">#{t}</span>)}
            <input type="text" ref="tagInput" />
            {this.state.prevValue[0] === "#" ? this.renderSuggestions() : undefined}
        </div>;
    }
    componentWillUnmount() {
        this.tagService.destroy();
    }
    renderSuggestions() {
        const value = this.state.prevValue.slice(1);
        const matches = this.state.allTags
            .filter((nr, tag) => tag.includes(value) &&
                !this.props.tags.includes(tag))
            .sort((a, b) => {
                return b - a;
            })
            .take(5)
            .entrySeq();
        return <div className="suggestions">{matches.map(tag =>
                <span key={tag[0]} onClick={this.onSuggestionClick.bind(this, tag[0])}>{tag[0]}({tag[1]})</span>
        )}</div>;
    }
    onSuggestionClick(tag) {
        this._addTag(tag);
    }
    onKeyup(e) {
        // On backspace empty
        if (e.which === 8 && this.state.prevValue === "") {
            this._deleteLast();
        }
        // On enter add tag
        if (e.which === 13 && this.regex.test(e.target.value)) {
            this._addTag(e.target.value);
        }
        this.setState({
            prevValue: e.target.value
        });
    }
    _deleteLast() {
        const currentTag = this.props.tags.last();
        if (currentTag) {
            this.refs.tagInput.value = "#" + currentTag;
            this.props.onChange(this.props.tags.butLast());
        }
    }
    _addTag(value) {
        this.refs.tagInput.value = "";
        this.setState({
            prevValue: ""
        });
        this.props.onChange(this.props.tags.push(value.replace("#", "")));
    }
}
