import React, { Component } from 'react';
import './projects.scss'
import ProjectThumbnailComponent from './projectThumbnailComponent.jsx';
import {
    Switch,
    Route
} from "react-router-dom";
import WikipediaLookupComponent from './wikipediaLookup/wikipediaLookupComponent';
import wikiThumbnail from '../../assets/projectImages/wikipediaLookup.png';
import RandomWalkWrapperComponent from './randomWalk/randomWalkWrapperComponent';
import randomWalkThumbnail from '../../assets/projectImages/randomWalk.jpg';
import GameOfLife from './gameOfLife/GameOfLife';
import gameOfLifeThumbnail from '../../assets/projectImages/react_game_of_life.jpg';
import CompactLpDoasComponent from './compact-lp-doas/compactLpDoasComponent';
import lpdoasThumbnail from '../../assets/projectImages/lp-doas/the_inside.jpg';

export default class Projects extends Component {

    constructor(props) {
        super(props);

        this.state = {
            galleryItemsArray: []
        }

        this.state.galleryItemsArray.push({
            key: "1",
            imgSrc: lpdoasThumbnail,
            projectPath: "compactlpdoas",
            alt: "Thumbnail compact lp doas",
            caption: "Remote sensing instrument"
        }, {
            key: "2",
            imgSrc: gameOfLifeThumbnail,
            projectPath: "gameOfLife",
            alt: "An implementation of Conways game of life, using react.js and JavaScript. Find more information on the game of life and some cool figures like the glider on https://de.wikipedia.org/wiki/Conways_Spiel_des_Lebens.",
            caption: "The famous game of life"
        }, {
            key: "3",
            imgSrc: randomWalkThumbnail,
            projectPath: "randomWalk",
            alt: 'An implementation of a random walk written in JavaScript. It includes collision and border collision checks and various control parameters. Below a graph is shown, which was made using D3.js. It shows the total travelled distance of all walkers and the Expected Value of the distribution of the steps taken.',
            caption: 'The Drunkard\'s walk'
        }, {
            key: "4",
            imgSrc: wikiThumbnail,
            projectPath: "wikipedia",
            alt: 'A simple wikipedia lookup application. Type in a search word in english, and it will give you the first two articles. Click on dwell to get a random article.',
            caption: "Wikipedia in a nutshell..."
        })


    }

    /*createCodeGallery = function(){
        galleryItemsArray = [];
        galleryItemsArray.push(new GalleryObject('projects/python/titanic/titanic.html',
                                                 'projectImages/python/titanic/titanic.jpg',
                                                 'code',
                                                 'python_python',
                                                 'Thumbnail of an example analysis of the famous titanic dataset.',
                                                 'An analysis of the titanic dataset. The goal was to find a model, that could predict survival or death of the passengers with a reasonable accuracy, from a set of variables.',
                                                 'titanicDataset'));
        galleryItemsArray.push(new GalleryObject('projects/python/LinearRegression/ecommerce_company.html',
                                                 'projectImages/python/LinearRegression/ecommerce_company.jpg',
                                                 'code',
                                                 'python_python',
                                                 'Thumbnail of an example analysis of data using a linear regression model.',
                                                 'An analysis of example data using a linear regression model. Used libraries are pandas, numpy, matplotlib.plotly, seaborn and sklearn.',
                                                 'linearRegression'));
        galleryItemsArray.push(new GalleryObject('projects/react/roguelikeChambergame-master/build/index.html', 
                                                    'projectImages/javascript/react/react_roguelike_chambergame.jpg', 
                                                    'code', 
                                                    'javascript_react', 
                                                    'Thumbnail of roguelike chambergame project, using react.js and rot.js.',
                                                    'A roguelike chambergame, using JavaScript, react.js, rot.js, Bootstrap and jQuery. Rules inside!', 
                                                    'roguelike'));
        galleryItemsArray.push(new GalleryObject('projects/d3/heatMap/index.html', 
                                                    'projectImages/javascript/d3/d3_heatMap.jpg', 
                                                    'code', 
                                                    'javascript_d3',
                                                    'Thumbnail of a project showing a heatmap of the difference between mean global temperature (by month) and a mean between 1951 and 1980.',
                                                    'A heatmap of the difference between the mean global temperature (by month) and the mean global temperature between 1951 and 1980, using D3.js, JavaScript, CSS and HTML. It was made responsive manually, using breakpoints / media queries in CSS.', 
                                                    'heatMap'));
        galleryItemsArray.push(new GalleryObject('projects/python/plotly/911Calls/index.html',
                                                    'projectImages/python/plotly/plotly_911Calls.jpg',
                                                    'code',
                                                    'python_python',
                                                    'Thumbnail of a project showing 911 calls on a map of Philadelphia, using among others, Pandas, Plotly and Mapbox.',
                                                    'Implementation of a Map showing 911 calls in Philadelphia. Can be easily customized to your needs. Code was written in Python using Jupyter Notebooks and then translated to HTML and JavaScript.',
                                                    '911Calls'));
        galleryItemsArray.push(new GalleryObject('projects/vanilla/randomQuote/random.html',
                                                    'projectImages/javascript/vanilla/vanilla_randomQuote.jpg',
                                                    'code',
                                                    'javascript_vanilla',
                                                    'Thumbnail of a random quote machine.',
                                                    'This tiny app will show you a random quote. Use it to feel wiser. You can also twitter it and gain millions of followers...',
                                                    'randomQuote'));
        galleryItemsArray.push(new GalleryObject('projects/vanilla/calculator/calc.html',
                                                    'projectImages/javascript/vanilla/vanilla_calculator.jpg',
                                                    'code',
                                                    'javascript_vanilla',
                                                    'Thumbnail of an implementation of a calculator.',
                                                    'A calculator made using only HTML, CSS and basic JavaScript. Relies on jQuery.',
                                                    'calculator'));
        galleryItemsArray.push(new GalleryObject('projects/d3/geoorthographicMapMeteorite/index.html', 
                                                    'projectImages/javascript/d3/d3_geoorthographic_meteorite_graph.jpg', 
                                                    'code', 
                                                    'javascript_d3', 
                                                    'Thumbnail of a project showing a worldglobe and registered meteorite impacts on it, using D3.js and SVGs.',
                                                    'A geoorthographic (globe) map of the world, showing registered meteorite impacts. Scroll to zoom (only on land). Hover impacts to get more information. It uses D3.js and JavaScript.',
                                                    'meteoriteMap'));
        galleryItemsArray.push(new GalleryObject('projects/vanilla/simonsGame/index.html',
                                                    'projectImages/javascript/vanilla/vanilla_simonsGame.jpg',
                                                    'code',
                                                    'javascript_vanilla',
                                                    'Thumbnail of a project implementing a Simon\'s Game',
                                                    'An implementation of a Simon\'s Game. Play by clicking start. Try to reclick the played sequence of buttons and tones. In normal mode you can retry. In strict mode you loose immediately, when you click a wrong button.',
                                                    'simonsGame'));
        galleryItemsArray.push(new GalleryObject('projects/vanilla/ticTacToe/ticTacToe.html',
                                                    'projectImages/javascript/vanilla/vanilla_ticTacToe.jpg',
                                                    'code',
                                                    'javascript_vanilla',
                                                    'Thumbnail of a Tic Tac Toe game for one or two players.',
                                                    'Implementation of the classic game of Tic-Tac-Toe. You can either play with a human player or against the AI. But beware, the AI is extremly (if not impossible...) to beat.',
                                                    'ticTacToe'));
        galleryItemsArray.push(new GalleryObject('projects/vanilla/pomodoro/pomodoro.html',
                                                    'projectImages/javascript/vanilla/vanilla_pomodoro.jpg',
                                                    'code',
                                                    'javascript_vanilla',
                                                    'Thumbnail of a project implementing a Pomodoro clock',
                                                    'A Pomodoro clock, to increase your productivity!',
                                                    'pomodoro'));
        
        
        galleryItemsArray.forEach(function(element) {
            
            let elementNode = element.getGalleryItemNode();
            galleryNode.appendChild(elementNode);
        }, this);
        
    }*/

    render() {
        const gridResponsiveClasses = "col-12 col-lg-3 col-md-4 col-sm-6 p-5";

        return (
            <Switch>
                <Route path = "/projects/wikipedia" >
                    <WikipediaLookupComponent />
                </Route>
                <Route path = "/projects/randomWalk" >
                    <RandomWalkWrapperComponent />
                </Route>
                <Route path = "/projects/gameoflife" >
                    <GameOfLife />
                </Route>
                <Route path = "/projects/compactlpdoas" >
                    <CompactLpDoasComponent />
                </Route>
                <Route path = "/projects" >
                        <div className = "projectsContainer d-flex flex-column" >
                            <div className = "row" > {
                                            this.state.galleryItemsArray.map((project) => (
                                                <ProjectThumbnailComponent key={project.key}
                                                    project={project}
                                                    responsiveClasses={gridResponsiveClasses}
                                                    projectPath={project.projectPath}
                                                    imgSrc={project.imgSrc}
                                                    caption = {project.caption}/>
                                            ))
                                        }
                            </div> 
                        </div> 
                </Route>
            </Switch>
        );
    }
}