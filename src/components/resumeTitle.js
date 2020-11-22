import React, { Component } from 'react';   
import './resumeTitle.scss';

export default class ResumeTitle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            icon: props.icon,
            alt: props.alt,
            title: props.title
        }
    }

    render() {
        return (
            <div className="row titleRow d-flex align-items-center">
                <img src={this.state.icon} className="icon" alt={this.state.alt} /><div className="titles">{this.state.title}</div>
            </div>
        );
    }
}