import React from "react";
import DashboardSection from "components/dashboard-section";

export default class PhotosPage extends React.Component {
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired
        };
    }
    render() {
        return (<div className="dashboard">
        <DashboardSection
            title={"@" + this.props.params.username + "\'s photos"}
            photos={this.props.photos.toList()}
            stars={this.props.stars}/>
        </div>);
    }
}
