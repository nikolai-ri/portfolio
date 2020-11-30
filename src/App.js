import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.scss';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Resume from './components/resume'
import Projects from './components/projects/projects'
import Impressum from './components/impressum'

import emailLogo from './assets/connect/email.png'
import pxLogo from './assets/connect/500px_logo.png'
import github from './assets/connect/githubLogo.png'
import linkedinLogo from './assets/connect/linkedin-outline.png'

function App() {
  return (
    <Router>
      <div className="App">
        <div id="navContainer">
          <Nav className="flex-column justify-content-center p-lg-3">
            <Nav.Link as={Link} to="/">Resume</Nav.Link>
            <Nav.Link as={Link} to="/projects" eventKey="link-1">Projects</Nav.Link>
            <Nav.Link as={Link} to="/impressum" eventKey="link-2">Impressum</Nav.Link>
          </Nav>
          <div className="contactContainer">
            <div className="row d-flex align-items-center">
                <a href='mailto:nikolai.riedel@gmail.com'><img className='followLogos'
                        src={emailLogo} alt='Email' title='Email' /></a>
                <a href='https://no.linkedin.com/in/nikolairiedel'><img className='followLogos'
                        src={linkedinLogo} alt='LinkedIn profile' title='Linkedin profile' /></a>
                <a href="https://github.com/nikolairiedel"><img className="followLogos" src={github}
                        alt="GitHub profile" title="GitHub profile" /></a>
                <a href="https://500px.com/p/nikolair"><img className="followLogos" src={pxLogo}
                        alt="500px profile" title="500px profile" /></a>
            </div>
          </div>
        </div>

        <div className="contentContainer container-fluid p-0 m-0">
        <Switch>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/impressum">
            <Impressum />
          </Route>
          <Route path="/">
            <Resume />
          </Route>
        </Switch>
        
        </div>

      </div>
    </Router>
  );
}

export default App;
