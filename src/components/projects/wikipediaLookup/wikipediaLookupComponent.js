import React, { Component } from 'react';   
import './wikipediaLookupComponent.scss';
import $ from 'jquery';
import DOMPurify from 'dompurify';

export default class WikipediaLookupComponent extends Component {

    timeKeeper = 0;
    timeProvider = new Date();

    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
    }

    getResults = function(searchTerm = "random", limit){

        let searchParameters = {};
        let wikiURL = "";
        this.setState({
            results: []
        })

        if(searchTerm !== 0 && searchTerm !== "random"){

            this.timeProvider = new Date();

            if(this.timeProvider.getTime() - this.timeKeeper > 100){

                searchParameters = {
                    'origin' : "*",
                    'action' : 'opensearch',
                    'search' : searchTerm,
                    'prop'  : 'revisions',
                    'rvprop' : 'content',
                    'format' : 'json',
                    'limit' : limit,
                    'redirects' : 'resolve'
                }
                wikiURL = "https://en.wikipedia.org/w/api.php?" + $.param(searchParameters);
                
                fetch(wikiURL, {
                    crossDomain:true,
                    headers: {'Content-Type':'application/json'}
                  }).then(
                      res => res.json()
                  ).then(
                    (result) => {
                        if (result === undefined) return 0;
                        let items = [];
                        for (var i = 0; i < limit; i++){
                            if (result[1] === undefined) continue;
                            if(result[1][i] !== undefined){
                                const wikiEntry = <div className='result d-flex'>
                                                    <div className="result-title align-self-center">{result[1][i]}</div>
                                                    <div className="align-self-center"><a href={result[3][i]} className='wikipediaButton btn btn-light'>Open on Wikipedia</a></div>
                                                  </div>;
                                items.push(wikiEntry);
                            }
                        }
                      this.setState({
                        isLoaded: true,
                        results: items
                      });
                    },
                    (error) => {
                      this.setState({
                        isLoaded: true,
                        error
                      });
                    }
                  )

                this.timeProvider = new Date();
                this.timeKeeper = this.timeProvider.getTime();
            }
        }
        else if(searchTerm !== 0 && searchTerm === "random"){

            searchParameters = {
                'origin': '*',
                'action' : 'query',
                'generator' : 'random',
                'grnnamespace' : '0',
                'prop'  : 'extracts',
                'exintro' : '',
                'format' : 'json'
            }

            wikiURL = "https://en.wikipedia.org/w/api.php?" + $.param(searchParameters);

            fetch(wikiURL, {
                crossDomain:true,
                headers: {'Content-Type':'application/json'}
              }).then(
                  res => res.json()
              ).then(
                (result) => {
                    if (result === undefined) return 0;
                    let items = [];
                    for (var i = 0; i < limit; i++){
                        if(result !== undefined){
                            const wikiEntry = <div className='result randomResult'>
                                                <h4 className='card-title'>{result.query.pages[Object.keys(result.query.pages)[0]].title}</h4>
                                                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(result.query.pages[Object.keys(result.query.pages)[0]].extract)}} />
                                                <a href={'https://en.wikipedia.org/wiki/' + result.query.pages[Object.keys(result.query.pages)[0]].title} className='wikipediaButton'>Open on Wikipedia</a>     
                                        </div>;
                            items.push(wikiEntry);
                        }
                    }
                  this.setState({
                    isLoaded: true,
                    results: items
                  });
                },
                (error) => {
                  this.setState({
                    isLoaded: true,
                    error
                  });
                }
              )   
        
            }
    }

    searchBoxHandler = function() {
        if($(".searchBox").val() !== undefined){
            this.getResults($(".searchBox").val(), 10);
        }
    }

    randomButtonHandler = function() {
        this.getResults(undefined, 1);
    }

    render() {
        return (
            <div id="wikipediaLookup" className="d-flex align-items-center flex-column">
                <div className="inputWrapper d-flex flex-column">
                    <input className="searchBox text-center" type="text" name="search" onChange={this.searchBoxHandler.bind(this)}/>
                    <button className="randomButton btn btn-light" type="submit" onClick={this.randomButtonHandler.bind(this)}>Dwell</button>
                </div>
                {this.state.results}	
            </div>
        );
    }
}
