import React from "react";
import Rx from "rxjs";
import Immutable from "immutable";

export default class TagEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedTags: Immutable.List(),
            prevValue: ""
        };
        this.regex = /^#[a-zA-Z][a-zA-Z\-]+[a-zA-Z]$/;

    }
    componentDidMount() {
        this.sub = Rx.Observable.fromEvent(this.refs.tagInput, "keyup")
            //.throttle(500)
            .subscribe(this.onKeyup.bind(this));
    }
    render() {
        return <div className="tag-editor">
            {this.state.selectedTags.map(t =>
                <span className="tag">{t}</span>)}
            <input type="text" ref="tagInput" />
            {this.state.prevValue[0] === "#" ? this.renderSuggestions() : undefined}
        </div>;
    }
    renderSuggestions() {
        const value = this.state.prevValue.slice(1);
        const matches = this.props.tags
            .filter((nr, tag) => tag.includes(value))
            .sort((a, b) => b.count - a.count)
            .take(5);
        return <div>{matches.map((nr, tag) =>
                <span onClick={this.onSuggestionClick.bind(this, tag)}>{tag} x {nr}</span>)
        }</div>;
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
        const currentTag = this.state.selectedTags.last();
        this.setState({
            selectedTags: this.state.selectedTags.butLast()
        });
        this.refs.tagInput.value = currentTag;
    }
    _addTag(value) {
        this.setState({
            selectedTags: this.state.selectedTags.push(value)
        });
        this.refs.tagInput.value = "";
    }
}
