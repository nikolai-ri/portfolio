import React, { Component } from 'react';
import { List } from "immutable";
import './gameOfLife.css';
import Cell from './cell.jsx';

/* Data flow is from Grid to Cell. On the Grid the properties are set, and then pushed to the Cells.*/

export default class GameOfLife extends Component{

    constructor(){
        super();

        this.state = {
            properties : List(), // List for the properties of each cell
            cellsX : 0, // Number of cells in x direction
            cellsY : 0, // Number of cells in y direction
            cellSize : 0, // Size of each cell in px
            cells : List(), // List for the actual react component of each cell
            gridWrapperClass : "gridWrapper5030", // class for styling purpose of the different grid sizes
            gameWrapper : "5030", // class for styling purpose of the different grid sizes
            generations : 0, // number of generations
            gameBreakout : 0, // value to be able to break out of a running game
            currentgeneration : 0, // current generation. Is needed here, so that when you run e.g. 50 generations, and let it run again without resetting, it start at 50 and not zero.
            pageJustLoaded : true // needed to start the game automatically only the first time, when you set up the fieldsize
        }
    }

    /* Set up the default values at the start*/

    componentDidMount(){

        this.setState({
            cellsX : 50,  // cells in X direction. The grid will be scaled accordingly.
            cellsY : 30,  // cells in Y direction. The grid will be scaled accordingly.
            cellSize : 2 * window.innerHeight / 100,  // the size of a cell in px. The size of the box inside (!) the cell can be set using css. The inside of the cell should not be set larger than this value...
            gameWrapper : "5030",  // this variable is used for the class of the wrapper element. Just for styling purposes.
            generations : 50 //number of generations in the first run
        }, () => this.setFieldSize(this.state.cellsX, this.state.cellsY, this.state.cellSize));
    }

    /* Sets up the field. This extra function is needed, so it can also be called after the first mounting, when changing the field size. */

    setFieldSize(fieldX, fieldY, cellSize){
        this.setState({
            cellsX : fieldX,
            cellsY : fieldY,
            gridWrapperClass : "gridWrapper" + fieldX + fieldY,
            gameWrapper : "" + fieldX + fieldY,
            cellSize : cellSize,
            gameBreakout : true,
            currentgeneration : 0
        }, () => this.loadField(fieldX, fieldY));
    }

    /* Loads actual cells (which are all not alive) into the field */

    loadField(fieldX, fieldY){


        let propsList  = List();
        let cellsTemp = List();
        let index = 0;
        const cellsX = fieldX;
        const cellsY = fieldY;
        const cellSize = this.state.cellSize;

        let that = this;
        this.setState({
                        properties : List(),
                        cells : List()
                        }, function(){
                                      for (let k = 0; k < cellsY; k++){
                                          for(let l = 0; l < cellsX; l++){
                                              propsList = propsList.push([k * cellSize,
                                                                          l * that.state.cellSize,
                                                                          0,
                                                                          index,
                                                                          that.state.cellsX,
                                                                          that.state.cellsY]);
                                              cellsTemp = cellsTemp.push(<Cell props={propsList.get(index)} key={"cell" + index} onClick={that.killOrBirth.bind(that, index)}/>);
                                              index++;
                                           }
                                       }
                                       that.setState({
                                                      properties : propsList,
                                                      cells : cellsTemp
                                                        }, function(){
                                                                if(this.state.pageJustLoaded === true){
                                                                    this.createRandomField();
                                                                }
                                                     });
                                });
    }

    /* This function is used by the game of life function, and implements the rules of the game of life. */

    killOrBirth(index){

        let propsList  = this.state.properties;
        let cellsTemp = this.state.cells;

        if(propsList.get(index)[2] === 0){
            propsList = propsList.set(index , [propsList.get(index)[0], propsList.get(index)[1], 1, index, propsList.get(index)[4], propsList.get(index)[5]]);
        }
        else{
            propsList = propsList.set(index , [propsList.get(index)[0], propsList.get(index)[1], 0, index, propsList.get(index)[4], propsList.get(index)[5]]);
        }

        cellsTemp = cellsTemp.set(index, <Cell props={propsList.get(index)} key={"cell" + index} onClick={this.killOrBirth.bind(this, index)}/>);

        this.setState({
            properties : propsList
             }, () => this.setState({
                                 cells : cellsTemp
                             }));
    }

    /* Fills the grid up with a cells, where each cell gets a (random) value of 1 or 0 deciding if it should be alive or dead. */

    createRandomField(){

        let propsList  = List();
        let cellsTemp = List();
        let index = 0;

        const cellsX = this.state.cellsX;
        const cellsY = this.state.cellsY;

        /**/
        for (let k = 0; k < cellsY; k++){
            for(let l = 0; l < cellsX; l++){
                propsList = propsList.push([k * this.state.cellSize,
                                            l * this.state.cellSize,
                                            Math.round(Math.random()),
                                            index,
                                            this.state.cellsX,
                                            this.state.cellsY]);

                cellsTemp = cellsTemp.push(<Cell props={propsList.get(index)} key={"cell" + index} onClick={this.killOrBirth.bind(this, index)}/>);
                index++;
            }

        }

        this.setState({
                       properties : List(),
                       cells : List()
                        }, () => this.setState({
                                            properties : propsList,
                                            cells : cellsTemp
                                        }, function(){
                                            if(this.state.pageJustLoaded === true){
                                                this.refs.generationsInput.value = '50';
                                                this.setState({
                                                    pageJustLoaded : false
                                                }, () => this.gameOfLifeWrapperFunction(this.state.generations, 0));

                                            }
                                        }));
    }

    gameOfLifeWrapperFunction(breakValue, indexRecursive){

        this.setState({gameBreakout : false,

                       }, () => this.startTheGameOfLife(breakValue,
                                                        indexRecursive,
                                                        this.state.currentgeneration
                                                    ));

    }

    /* Checks each cells and re-sets its "alive" property according to the number of its neighbours */

    startTheGameOfLife(breakValue, indexRecursive, startgeneration){

        this.setState({
            currentgeneration : startgeneration + indexRecursive
        });

        if(indexRecursive === breakValue || this.state.gameBreakout === true) {

            this.setState({
                gameBreakout : false
            });
            return;
        }
        let propsList  = this.state.properties;
        let oldList = propsList;
        let cellsList = List();
        let neighbourCounter = 0;

        const cellsX = this.state.cellsX;
        const cellsY = this.state.cellsY;
        const cellSize = this.state.cellSize;

        function checkNeighbours(i, counter){
            if(counter === 3 && propsList.get(i)[2] === 0){
                return true;
            }
            if(counter < 2 && propsList.get(i)[2] === 1){
                return false;
            }
            if((counter === 2 || counter === 3) && propsList.get(i)[2] === 1){
                return true;
            }
            if((counter > 3) && propsList.get(i)[2] === 1){
                return false;
            }
        }

        /**
         *
         * @param {*} i
         * @param {*} propsList
         * @param number live - 0 is death and 1 is live.
         */
        function setPropList(i, propsList, live){
            return propsList.set(i, [propsList.get(i)[0], propsList.get(i)[1], live, i, propsList.get(i)[4], propsList.get(i)[5]]);
        }

        let that = this;
        setTimeout(function(){

            propsList.forEach(function(val, i) {
                /* The cells have different amount of possible neighbours. In this implementation these cells are treated differently. */

                /*
                     Inner Cells:
                     -------------
                     -***********-
                     -***********-
                     -***********-
                     -------------
                */
                if(val[0] !== 0 && val[0] !== ((cellsY - 1) * cellSize) && val[1] !== 0 && val[1] !== ((cellsX - 1) * cellSize)){

                    if(oldList.get(i - 1 - cellsX)[2] === 1) neighbourCounter++;
                    if(oldList.get(i - cellsX)[2] === 1) neighbourCounter++;
                    if(oldList.get(i + 1 - cellsX)[2] === 1) neighbourCounter++;
                    if(oldList.get(i - 1)[2] === 1) neighbourCounter++;
                    if(oldList.get(i + 1)[2] === 1) neighbourCounter++;
                    if(oldList.get(i - 1 + cellsX)[2] === 1) neighbourCounter++;
                    if(oldList.get(i + cellsX)[2] === 1) neighbourCounter++;
                    if(oldList.get(i + 1 + cellsX)[2] === 1) neighbourCounter++;

                    if(checkNeighbours(i, neighbourCounter) === true){
                        propsList = setPropList(i, propsList, 1);
                    }
                    else{
                        propsList = setPropList(i, propsList, 0);
                    }



                    neighbourCounter = 0;
                }

                /*
                     Upper Row Cells:
                     *************
                     -------------
                     -------------
                     -------------
                     -------------
                */

                else if(val[0] === 0 && val[1] >= 0 && val[1] <= (cellSize * (cellsX - 1))){
                    if(val[1] > 0 && val[1] < (cellSize * (cellsX - 1))){
                        if(oldList.get(i - 1)[2] === 1) neighbourCounter++;
                        if(oldList.get(i + 1)[2] === 1) neighbourCounter++;
                        if(oldList.get(i - 1 + cellsX)[2] === 1) neighbourCounter++;
                        if(oldList.get(i + cellsX)[2] === 1) neighbourCounter++;
                        if(oldList.get(i + 1 + cellsX)[2] === 1) neighbourCounter++;

                        if(checkNeighbours(i, neighbourCounter) === true){
                            propsList = setPropList(i, propsList, 1);
                        }
                        else{
                            propsList = setPropList(i, propsList, 0);
                        }

                        neighbourCounter = 0;

                    }
                    else if(val[1] === (cellSize * (cellsX - 1))){
                        if(oldList.get(i - 1)[2] === 1) neighbourCounter++;
                        if(oldList.get(i + cellsX)[2] === 1) neighbourCounter++;
                        if(oldList.get(i - 1 + cellsX)[2] === 1) neighbourCounter++;

                        if(checkNeighbours(i, neighbourCounter, 1) === true){
                            propsList = setPropList(i, propsList);
                        }
                        else{
                            propsList = setPropList(i, propsList, 0);
                        }

                        neighbourCounter = 0;

                    }
                    else if(val[1] === 0){
                        if(oldList.get(i + 1)[2] === 1) neighbourCounter++;
                        if(oldList.get(i + cellsX)[2] === 1) neighbourCounter++;
                        if(oldList.get(i + 1 + cellsX)[2] === 1) neighbourCounter++;

                        if(checkNeighbours(i, neighbourCounter) === true){
                            propsList = setPropList(i, propsList, 1);
                        }
                        else{
                            propsList = setPropList(i, propsList, 0);
                        }

                        neighbourCounter = 0;

                    }
                }

                /*
                     Lower Row Cells:
                     -------------
                     -------------
                     -------------
                     -------------
                     *************
                */

                else if(val[0] === (cellSize * (cellsY - 1)) && val[1] >= 0 && val[1] <= (cellSize * cellsX)){
                    if(val[1] > 0 && val[1] < (cellSize * (cellsX - 1))){
                        if(oldList.get(i - 1)[2] === 1) neighbourCounter++;
                        if(oldList.get(i + 1)[2] === 1) neighbourCounter++;
                        if(oldList.get(i - 1 - cellsX)[2] === 1) neighbourCounter++;
                        if(oldList.get(i - cellsX)[2] === 1) neighbourCounter++;
                        if(oldList.get(i + 1 - cellsX)[2] === 1) neighbourCounter++;

                        if(checkNeighbours(i, neighbourCounter) === true){
                            propsList = setPropList(i, propsList, 1);
                        }
                        else{
                            propsList = setPropList(i, propsList, 0);
                        }

                        neighbourCounter = 0;

                    }
                    else if(val[1] === (cellSize * (cellsX - 1))){
                        if(oldList.get(i - 1)[2] === 1) neighbourCounter++;
                        if(oldList.get(i - cellsX)[2] === 1) neighbourCounter++;
                        if(oldList.get(i - 1 - cellsX)[2] === 1) neighbourCounter++;

                        if(checkNeighbours(i, neighbourCounter) === true){
                            propsList = setPropList(i, propsList, 1);
                        }
                        else{
                            propsList = setPropList(i, propsList, 0);
                        }

                        neighbourCounter = 0;

                    }
                    else if(val[1] === 0){
                        if(oldList.get(i + 1)[2] === 1) neighbourCounter++;
                        if(oldList.get(i - cellsX)[2] === 1) neighbourCounter++;
                        if(oldList.get(i + 1 - cellsX)[2] === 1) neighbourCounter++;

                        if(checkNeighbours(i, neighbourCounter) === true){
                            propsList = setPropList(i, propsList, 1);
                        }
                        else{
                            propsList = setPropList(i, propsList, 0);
                        }

                        neighbourCounter = 0;

                    }

                }

                /*
                     Left RowInner Cells:
                     -------------
                     *------------
                     *------------
                     *------------
                     -------------
                */

                else if(val[1] === 0 && val[0] > 0 && val[0] < (cellSize * (cellsY - 1))){
                    if(oldList.get(i - cellsX)[2] === 1) neighbourCounter++;
                    if(oldList.get(i + 1 - cellsX)[2] === 1) neighbourCounter++;
                    if(oldList.get(i + 1)[2] === 1) neighbourCounter++;
                    if(oldList.get(i + 1 + cellsX)[2] === 1) neighbourCounter++;
                    if(oldList.get(i + cellsX)[2] === 1) neighbourCounter++;

                    if(checkNeighbours(i, neighbourCounter) === true){
                        propsList = setPropList(i, propsList, 1);
                    }
                    else{
                        propsList = setPropList(i, propsList, 0);
                    }

                    neighbourCounter = 0;
                }

                /*
                     Right RowInner Cells:
                     -------------
                     ------------*
                     ------------*
                     ------------*
                     -------------
                */

                else if(val[1] === (cellSize * (cellsX - 1)) && val[0] > 0 && val[0] < (cellSize * cellsY)){
                    if(oldList.get(i - cellsX)[2] === 1) neighbourCounter++;
                    if(oldList.get(i - 1 - cellsX)[2] === 1) neighbourCounter++;
                    if(oldList.get(i - 1)[2] === 1) neighbourCounter++;
                    if(oldList.get(i - 1 + cellsX)[2] === 1) neighbourCounter++;
                    if(oldList.get(i + cellsX)[2] === 1) neighbourCounter++;

                    if(checkNeighbours(i, neighbourCounter) === true){
                        propsList = setPropList(i, propsList, 1);
                    }
                    else{
                        propsList = setPropList(i, propsList, 0);
                    }

                    neighbourCounter = 0;
                }


            }, that);

            (function(){
                return new Promise(function(res, rej){
                    propsList.map(function(element, index){
                        cellsList = cellsList.set(index, <Cell props={propsList.get(index)} key={"cell" + index} onClick={that.killOrBirth.bind(that, index)}/>);
                        if (index === propsList.size - 1) res('ready');
                    });
                })
            })().then(function(val){
                that.setState({
                    properties : propsList,
                         cells : cellsList
                     }, () => that.startTheGameOfLife(breakValue, indexRecursive + 1, startgeneration));
             });


        }, 10);

    }

    handleChangeGenerationsInput(e){

            this.setState({
                generations : Number(e.target.value)
            });

    }

    render(){
        return (
            <div className={"gameWrapper" + this.state.gameWrapper + " container d-flex flex-column justify-content-center align-items-center"}>
                <div className="topButtonContainer">
                    <div className="d-flex justify-content-beginning">
                        <button type="text" onClick={this.createRandomField.bind(this)}>Random field</button>
                        <button type="text" onClick={this.setFieldSize.bind(this, this.state.cellsX, this.state.cellsY, this.state.cellSize)}>Reset / Stop</button>
                        <button type="text" onClick={this.gameOfLifeWrapperFunction.bind(this, this.state.generations, 0)}>Start</button>
                        <form className="d-flex align-content-center">
                            <input type="number" min="0" max="1000" ref="generationsInput" onChange={this.handleChangeGenerationsInput.bind(this)}/>
                        </form>
                        <p className='d-flex align-items-center'> Generations : {this.state.currentgeneration}</p>
                    </div>
                </div>
                <div className={"d-flex justify-content-center " + this.state.gridWrapperClass}>
                    <div className={this.state.gridWrapperClass}>{this.state.cells}</div>
                </div>
                <div className="row d-flex justify-content-center">
                    <button type="text" onClick={this.setFieldSize.bind(this, 50, 30, 2 * window.innerHeight / 100)}>Set 50 x 30</button>
                    <button type="text" onClick={this.setFieldSize.bind(this, 80, 50, 1.5 * window.innerHeight / 100)}>Set 80 x 50</button>
                    <button type="text" onClick={this.setFieldSize.bind(this, 100, 80, 1 * window.innerHeight / 100)}>Set 100 x 80</button>
                </div>
            </div>
        );
    }
}
