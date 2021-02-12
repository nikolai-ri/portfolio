import React from 'react';

export default class Cell extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            properties : props
        }
    }
    shouldComponentUpdate(nextProps){
            if(nextProps.props[2] !== this.state.properties.props[2]) {
                return true;
            }
            else{
                return false;
            }
    }

    componentWillUpdate(nextProps){
        this.setState({
            properties: nextProps
        });
    }

    render(){
            return (
                <div className={"component" + this.state.properties.props[2] + this.state.properties.props[4] + this.state.properties.props[5]} style={{top : this.state.properties.props[0] + "px", left : this.state.properties.props[1] + "px"}} onClick={this.state.properties.onClick}></div>
            );
    };
              
}