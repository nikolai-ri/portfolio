import React, { Component } from 'react';   
import './randomWalkWrapper.scss';
import * as d3 from 'd3';
import RandomWalk from './RandomWalk';

export default class RandomWalkWrapperComponent extends Component {

    constructor(props) {

        super();

        this.state = {
            /**
			 * This Part implements the random walk. The graph part using D3 is implemented blow this block.
			*/
			graphData: [],
			timeZero: 0,
			toggleBoarders: true,
			toggleCollisions: true,
			windowHeight: window.innerHeight - window.innerHeight / 10,
			windowWidth: window.innerWidth - window.innerWidth / 10,
			xCoordUpperCorner: 0,
			yCoordUpperCorner: 0,
			numberOfWalkers: 1,
			numberOfSteps: 10,
			partOfScreenUsed: 100,
			walkerContainerNode: null,
			randomWalk: null,
			reloaded: true, // Is set when the user clicks the reload button.
			/** 
			 * endOfWalkTime and offsetTime are used to make the graph continous on the time scale. If a random walk ends due to its number of steps being reached,
			 * the time still runs, and the next time it is continued, the graph will jump ahead to a new time. To avoid this, an offset is subtracted the continued time.
			*/
			endOfWalkTime: 0,
			offsetTime: 0,
			/* Block that runs the animation of the random walk*/
			lastFrameTimeMs: 0,
			maxFPS: 60,
            currentStep: 0,
            /*End of block that runs the animation*/
            /**
			 * This part implements the graph below the random walk. The distance to zero of the walkers or at most the first ten walkers are shown, and the total distance of all walkers.
			*/
            svg: null,
            margin: {top: 10, right: 10, bottom: 10, left: 30},
			graphHeight: null,
            graphWidth: null,
            g: null,
			x: null,
			yDistance: null,
			yMeanDistance: null,
			line: null,
			lineMean: null,
			xAxis: null,
        }
    }

    componentDidMount() {

        this.setState((state, props) => {
            return {
                walkerContainerNode: document.getElementById('container-walker'),
                svg: d3.select("#positionGraph"),
            }
        }, () => this.setState((state, props) => {
            return {
                randomWalk: new RandomWalk( state.numberOfWalkers, 
                                            state.xCoordUpperCorner, 
                                            state.yCoordUpperCorner, 
                                            state.walkerContainerNode.clientHeight, 
                                            state.walkerContainerNode.clientWidth, 
                                            state.partOfScreenUsed, 
                                            state.windowHeight, 
                                            state.walkerContainerNode,
                                            state.numberOfSteps,
                                            state.graphData,
                                            state.toggleBoarders,
                                            state.toggleCollisions),
                graphHeight: state.svg.attr('height') - state.margin.top - state.margin.bottom,
                graphWidth: state.svg.attr('width') - state.margin.left - state.margin.right,
                g: this.state.svg.append("g")
                            .attr('width', this.state.graphWidth + this.state.margin.left + this.state.margin.right)
                            .attr('height', this.state.graphHeight + this.state.margin.top + this.state.margin.bottom)
                            .attr("transform", 
                                "translate(" + this.state.margin.left + "," + this.state.margin.top + ")"),
                x: d3.scaleLinear()	
                            .range([0, this.state.graphWidth - this.state.graphWidth/45])
                            .domain([0, 10]),
                yDistance: d3.scaleLinear()
                            .range([this.state.graphHeight, 0])
                            .domain([-10, 10]),
                yMeanDistance: d3.scaleLinear()
                                        .range([this.state.graphHeight / 5, 0])
                                        .domain([-1, 1]),
                line: d3.line()
                            .x((d) => this.state.x(d.date))
                            .y((d) => this.state.yDistance(d.distance)),
                lineMean: d3.line()
                            .x((d) => this.state.x(d.date))
                            .y((d) => this.state.yMeanDistance(d.expectedValue)),
            }
        }, () => {
            this.setState((state, props) => {
                return {
                    xAxis: state.g.append("g")
                        .attr("class", "x axis")
                        .attr('id', 'xAxis')
                        .attr("transform", "translate(0," + (this.state.graphHeight / 2) + ")")
                        .call(d3.axisBottom(this.state.x))
                    .append('text')
                        .attr('y', this.state.graphHeight/5)
                        .attr('x', this.state.graphWidth/80)
                        .attr('font-size', '1.5em')
                        .attr('fill', 'black')
                        .text('Time'),
                }
            }, () => {
                this.state.randomWalk.createWalkers();
                this.state.svg.attr('width', window.innerWidth - 3*window.innerWidth/100);
                this.state.svg.attr("height", window.innerHeight / 4);
                this.state.g.append("g")
                    .attr("class", "y axis")
                    .attr('id', 'yAxis')
                    .attr('transform', 'translate(' + (-this.state.graphWidth/120) + ', 0)')
                    .call(d3.axisLeft(this.state.yDistance))
                    .append("text")
                    .attr("x", this.state.graphWidth / 15)
                    .attr('y', this.state.graphHeight / 11)
                    .attr('font-size', '1.5em')
                    .attr('fill', 'steelblue')
                    .style("text-anchor", "end")
                    .text("Distance");
                this.state.g.append('g')
                    .attr('class', 'y axis')
                    .attr('id', 'yAxisMean')
                    .attr('transform', 'translate(' + (this.state.graphWidth - this.state.graphWidth/75) + ',' + (this.state.graphHeight / 2 - this.state.graphHeight/10) + ')')
                    .call(d3.axisRight(this.state.yMeanDistance).ticks(2))
                    .append('text')
                    .attr('x', this.state.graphHeight / 10)
                    .attr('y', -this.state.graphHeight / 3.5)
                    .attr('font-size', '1.5em')
                    .attr('fill', 'red')
                    .style('text-anchor', 'end')
                    .text('Expected Value');
                })}))      
    }

    /**
    * Event handler, which starts the random walk animation.
    */
    handleStartRandomWalk() {

        let tempTimeZero;
        let tempReloaded;
        let tempOffsetTime;

        if(this.state.reloaded){
            tempTimeZero = Date.now();
            tempReloaded = false;
            
        } else if(this.state.graphData[0] !== undefined){
            tempOffsetTime += (Date.now() - this.state.endOfWalkTime);
        }

        this.setState((state, props) => {
            
            state.g.selectAll("path").remove();

            return {
                currentStep: 0,
                graphData: [],
                numberOfSteps: Number(document.getElementById('numberOfSteps').value),
                timeZero: tempTimeZero,
                reloaded: tempReloaded,
                offsetTime: tempOffsetTime
            }
        })

        requestAnimationFrame(this.startRandomWalk.bind(this));
        	
    }

    /** 
     * Toggles the collisions on/off. Border collisions are still present, if not turned off separately.
    */
    handleToggleCollision(){
        this.setState((state, props) => {
            state.randomWalk.setToggleCollisions(!state.toggleCollisions);
            return {
                toggleCollisions: !state.toggleCollisions
            }
        });
    }

    /** 
     * Event handler that creates a walker, if the user clicks anywhere in the containerWalker
    */
    handleContainerWalkerClick(e){
        this.state.randomWalk.createOneWalker(e);
    }

    /** 
     * Event handler, which reloads the walkers and stops the current random walk. Graph is deleted only, when a new walk is started.
    */
    handleReloadWalkers(){
        this.setState((state, props) => {

            state.randomWalk.resetValues({
                numberOfWalkers: state.numberOfWalkers,
                numberOfSteps: state.numberOfSteps,
                partsOfScreenUsed: state.partsOfScreenUsed,
                xCoordUpperCorner: state.xCoordUpperCorner,
                yCoordUpperCorner: state.yCoordUpperCorner
            });
            state.randomWalk.removeChilds(this.state.walkerContainerNode);
            return {
                currentStep: state.numberOfSteps + 1,
                reloaded: true,
                offsetTime: 0
            }
        }, () => this.state.randomWalk.createWalkers());
    }

    /** 
     * Toggles the borders on/off. No border collisions if turned off.
    */
    handleToggleBorders(){
        this.setState((state, props) => {
            if(state.toggleBoarders){
                state.randomWalk.setToggleBoarders(!state.toggleBoarders);
                state.walkerContainerNode.setAttribute('style', 'border: 0px');
                return {toggleBoarders: false};
            } else {
                state.randomWalk.setToggleBoarders(!state.toggleBoarders);
                state.walkerContainerNode.setAttribute('style', 'border: 1px solid black');
                return {toggleBoarders: true};
            }
        })
    }
    
    /** 
    *Recursive function that runs the random walk. It is similar to the game loop in games.
    *@param number timestamp - Time in ms.
    */
    startRandomWalk(timestamp) {
        if(this.state.currentStep >= this.state.numberOfSteps){
            this.setState((state, props) => {
                return {
                    endOfWalkTime: Date.now(),
                }
            })
            return;
        } 
        if(timestamp < this.state.lastFrameTimeMs + 1000 / this.state.maxFPS){
            if(this.state.currentStep < this.state.numberOfSteps){
                requestAnimationFrame(this.startRandomWalk.bind(this));
                return;
            }
            return;
        }
        
        this.state.randomWalk.allWalkersIteration().then(
            () => {
                let totalDistance = 0;
                let currentTime = Date.now();
                for(let i = 0; i < this.state.randomWalk.walkerNodes.length; i++){
                    totalDistance = (this.state.randomWalk.walkerNodes[i].distance[0] + this.state.randomWalk.walkerNodes[i].distance[1]) / (this.state.windowHeight/100);

                    if(i === this.state.randomWalk.walkerNodes.length - 1){
                        this.state.graphData.push({
                            date : ( currentTime - this.state.offsetTime - this.state.timeZero ) / 1000,
                            distance : totalDistance,
                            expectedValue : this.state.randomWalk.getExpectedValue()
                        });
                    }
                }							
                this.updateGraph();
                this.setState((state, props) => {
                    return {
                        lastFrameTimeMs: timestamp,
                        currentStep: state.currentStep + 1
                    }
                }, () => requestAnimationFrame(this.startRandomWalk.bind(this)));
            }    
        );       
    }

    /**
     * Graph is updated on each iteration.
     */
    updateGraph() {
        this.state.g.selectAll("path").remove();
        this.state.x.domain([0, this.state.graphData[this.state.graphData.length - 1].date]);

        
        this.state.yDistance.domain([- d3.max(this.state.graphData, function(d){return Math.abs(d.distance);}), d3.max(this.state.graphData, function(d){return Math.abs(d.distance);})]);

        this.state.yMeanDistance.domain([- d3.max(this.state.graphData, function(d){return Math.abs(d.expectedValue);}), d3.max(this.state.graphData, function(d){return Math.abs(d.expectedValue);})]);
        d3.select('#xAxis').call(d3.axisBottom(this.state.x));
        d3.select('#yAxis').call(d3.axisLeft(this.state.yDistance));
        d3.select('#yAxisMean').call(d3.axisRight(this.state.yMeanDistance).ticks(2));
        
        this.state.g.append("path")
            .data([this.state.graphData])
            .attr("class", "line")
            .attr("d", this.state.line);

        this.state.g.append("path")
            .attr('id', 'yMeanDistance')
            .attr('transform', 'translate(0 ,' + (this.state.graphHeight / 2 - this.state.graphHeight/10) + ')')
            .data([this.state.graphData])
            .attr("class", "line")
            .attr("d", this.state.lineMean);
    }

    handleChangeOfWalkers(event) {
        this.setState(() => {
            return {
                numberOfWalkers: Number(event.target.value)
            }
        })
    }

    handleChangeOfSteps(event) {
        this.setState(() => {
            return {
                numberOfSteps: Number(event.target.value)
            }
        })
    }

    handleChangeOfXUpperCoord(event) {
        this.setState((state, props) => {
            return {
                xCoordUpperCorner: event.target.value
            }
        })
    }

    handleChangeOfYUpperCoord(event) {
        this.setState((state, props) => {
            return {
                yCoordUpperCorner: event.target.value
            }
        })
    }

    handleChangeOfUsedPercentage(event) {
        this.setState((state, props) => {
            return {
                partOfScreenUsed: event.target.value
            }
        })
    }

    render() {
        return (
            <div id="randomWalkWrapper">
                <div id='containerControls'>
                    <button type="button" id="buttonAllWalkers" onClick={this.handleStartRandomWalk.bind(this)}>Start Random Walk</button>
                    <button type="button" id="reloadWalkers" onClick={this.handleReloadWalkers.bind(this)}>Reload Walkers</button>
                    <label>Boarders<input type="checkbox" id="toggleBoarders" checked={this.state.toggleBoarders ? true : false} onChange={this.handleToggleBorders.bind(this)}/></label>
                    <label>Collisions<input type="checkbox" id="toggleCollisions" checked={this.state.toggleCollisions ? true : false} onChange={this.handleToggleCollision.bind(this)}/></label>
                    <span># Walkers: <input type="number" id='numberOfWalkers' value={this.state.numberOfWalkers} onChange={this.handleChangeOfWalkers.bind(this)}/></span>
                    <span># Steps: <input type="number" id='numberOfSteps' value={this.state.numberOfSteps} onChange={this.handleChangeOfSteps.bind(this)} /></span>
                    <span>X Upper Corner: <input type="number" id='xCoordinate' min='0' value={this.state.xCoordUpperCorner} onChange={this.handleChangeOfXUpperCoord.bind(this)} /></span>
                    <span>Y Upper Corner: <input type="number" id='yCoordinate' min='0' value={this.state.yCoordUpperCorner}  onChange={this.handleChangeOfYUpperCoord.bind(this)} /></span>
                    <span>Used Perc. of Screen: <input type='number' id='partOfScreen' max='100' min='1' value={this.state.partOfScreenUsed} onChange={this.handleChangeOfUsedPercentage.bind(this)} /></span>
                </div>
                <div id='containerContainer'>
                    <div id="container-walker" onClick={this.handleContainerWalkerClick.bind(this)}>
                    </div>
                </div>
                <div id='containerStatistics'>
                    <svg id='positionGraph'></svg>
                </div>
            </div>
        );
    }
}
