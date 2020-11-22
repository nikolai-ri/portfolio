import React, { Component } from 'react';
import './profileWorkEntry.scss';

export default class ProfileWorkEntry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time: props.time,
            company: props.company,
            title: props.title,
            tasks: props.tasks,
            rowClasses: props.rowClasses
        }
    }

    render() {
        return (
            <div className="experienceEntry">
                <div className={"row " + this.state.rowClasses}>
                    <div className="col-4">
                        {this.state.time}
                    </div>
                    <div className="col-8">
                        <div className="workExperienceTitle">{this.state.title}</div>
                        <div className="workExperienceCompany">{this.state.company}</div>
                        <div className="workExperienceTasks">{this.state.tasks}</div>
                    </div>
                </div>  
            </div>
        );
    }
}