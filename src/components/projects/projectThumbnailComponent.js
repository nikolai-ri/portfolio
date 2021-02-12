import React, { Component } from 'react';   
import { Link } from "react-router-dom";

export default class ProjectThumbnailComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            responsiveClasses: props.responsiveClasses,
            project: props.project,
            projectPath: props.projectPath,
            imgSource: props.imgSrc,
            alt: props.alt
        }
    }

    render() {
        return (
            <div key={this.state.project.key} className={this.state.responsiveClasses + " d-flex align-items-center"}>
                <Link to={"/projects/" + this.state.projectPath}><img className="img-fluid" src={this.state.imgSource} alt={this.state.alt}/></Link>
            </div>
        );
    }
}
