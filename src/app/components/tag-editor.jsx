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
                <span className="tag">{t}</span>)}
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
            .filter((nr, tag) => tag.includes(value))
            .sort((a, b) => b.count - a.count)
            .take(5);
        return <div>{matches.map((nr, tag) =>
                <span onClick={this.onSuggestionClick.bind(this, tag)}>{tag} x {nr}</span>
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
        this.refs.tagInput.value = currentTag;
        this.props.onChange(this.props.tags.butLast());
    }
    _addTag(value) {
        this.refs.tagInput.value = "";
        this.props.onChange(this.props.tags.push(value.replace("#", "")));
    }
}
