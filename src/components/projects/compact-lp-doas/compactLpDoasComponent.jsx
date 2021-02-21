import React, { Component } from 'react';
import './compactLpDoas.scss';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import markdown from './compactLpDoas.md';
import no2mixingratio from '../../../assets/projectImages/lp-doas/no2mixingratio.jpg';
import lpdoasschematic from '../../../assets/projectImages/lp-doas/schematics-lp-doas.jpg';

export default class CompactLpDoasComponent extends Component {
    
    constructor() { 
        super();

        this.state = {
            projectText : "loading project..."
        }

    }

    componentDidMount() { 

        fetch(markdown)
            .then(r => r.text())
                .then(text => {
                    this.setState({
                        projectText : text
                    })
                });
        
    }

    render() {
        return (
            <div id="compact-lp-doas-article-wrapper">
                <div id="compact-lp-doas-article">
                 <ReactMarkdown plugins={[gfm]} children={this.state.projectText} />
                </div>
            </div>
        );
    }
}