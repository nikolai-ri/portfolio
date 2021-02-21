import React, { Component } from 'react';   
import { Link } from "react-router-dom";
import './projectThumbnail.scss';

export default class ProjectThumbnailComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            responsiveClasses: props.responsiveClasses,
            project: props.project,
            projectPath: props.projectPath,
            imgSource: props.imgSrc,
            alt: props.alt,
            caption: props.caption
        }
    }

    render() {
        return (
            <div key={this.state.project.key} className={this.state.responsiveClasses + " d-flex align-items-center justify-content-center flex-column"}>
                <Link to={"/projects/" + this.state.projectPath}>
                    <img className="img-fluid" src={this.state.imgSource} alt={this.state.alt} />
                </Link>
                <div className="imageCaptionProjectList">{ this.state.caption }</div>
            </div>
        );
    }
}
