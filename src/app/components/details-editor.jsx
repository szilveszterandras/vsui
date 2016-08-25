import React from "react";
import TagEditor from "components/tag-editor";

export default class DetailsEditor extends React.Component {
    render() {
        return (<div className="form-default dark">
            <div className="flex align-items-center">
                <label htmlFor="title">Title:</label>
                <input type="text" name="title"
                    value={this.props.title} onChange={e => {
                        this.onChange({
                            title: e.target.value
                        });
                    }} />
            </div>
            <div className="flex align-items-center">
                <label htmlFor="description">Description:</label>
                <input type="text" name="description"
                    value={this.props.description} onChange={e => {
                        this.onChange({
                            description: e.target.value
                        });
                    }} />
            </div>
            <div className="flex">
                <label className="tag-label">Tags:</label>
                <TagEditor ref="tags" tags={this.props.tags} onChange={tags => {
                    this.onChange({
                        tags
                    });
                }} />
            </div>
        </div>);
    }
    onChange(data) {
        const d = {
            title: this.props.title,
            description: this.props.description,
            tags: this.props.tags
        };
        this.props.onChange(Object.assign(d, data));
    }
}
