import React, { Component } from 'react';   
import './measure.scss';

export default class Measure extends Component {

    constructor(props) {
        super(props);
        this.state = {
            percentage: props.percentage,
            startColor: props.startColor,
            endColor: props.endColor
        }
    }

    render() {
        const measureStyle = {
            display: "inline-block",
            width: "100%",
            height: "0.7rem",
            padding: "0",
            backgroundColor: "grey",
            backgroundImage: "linear-gradient(to right, #d2d2d5 0%, #d2d2d5 100%), linear-gradient(to right, " + this.state.startColor + " 0%, " + this.state.endColor + " 100%)",
            backgroundClip: "content-box, padding-box",
            paddingLeft: this.state.percentage + "%"
        }
        return (
            <div className="col-5 d-flex align-items-center">
                <div style={measureStyle} />
            </div>
        );
    }
}
