import React, { Component } from 'react';   
import './skills.scss';
import Measure from './measure';

export default class Skills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            skillTitle: props.skillTitle,
            skills: props.skills
        }
    }

    render() {
        const skills = this.state.skills.map((skill) => (
            <div className="row" key={skill.key}>
                <div className="col-7">
                    <div className="skillName">{skill.name}</div>
                </div>
                <Measure percentage={skill.percentage} startColor={skill.startColor} endColor={skill.endColor} />
            </div>
        ));

        return (
            <div id="skills">
                <div className="skillTitles">{this.state.skillTitle}</div>
                {skills}
        </div>
        );
    }
}