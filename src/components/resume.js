import React, { Component } from 'react';
import './resume.scss';
import ProfileWorkEntry from './profileWorkEntry';
import ResumeTitle from './resumeTitle';
import Skills from './skills';
import strengthsIcon from '../assets/resume/strengthsIcon.jpg';
import profileIcon from "../assets/resume/profileIcon.jpg";
import workExperienceIcon from "../assets/resume/workExperienceIcon.jpg";
import educationIcon from "../assets/resume/educationIcon.jpg";
import skillsIcon from "../assets/resume/skillsIcon.png";
import profilePicture from "../assets/resume/profilepicture.jpg"

export default class Resume extends Component {

    render() {
        let constResponsiveClassesSkills = "col-lg-3 col-md-6 col-sm-6 col-xs-12"; 
        return (
            <div id="wrapperResume">
                <div className="profileRow">
                    <div className="row">
                        <div className="col col-12">
                            <ResumeTitle icon={profileIcon} alt="Profile icon" title="PROFILE" />
                        </div>
                    </div>
                    <div className="row descriptionRow border-top justify-content-center">
                        <div className="col col-sm-9 col-12">
                            <p id="profileParagraph">Physicist by education, problem solver by heart. I am always trying to learn from others and to improve myself. I am interested in working on and being part of the solution to global issues such as climate change.</p>
                        </div>
                        <div className="col col-lg-3 col-md-3 col-sm-3 col-12 d-flex justify-content-center align-items-center">
                            <img src={profilePicture} alt="profile picture" id="profilePicture" />
                        </div>
                    </div>
                </div>
                <div className="skillsRow">
                    <ResumeTitle icon={skillsIcon} alt="Skills icon" title="SKILLS" />  
                    <div className="row border-top">
                        <div class={constResponsiveClassesSkills}>
                            <Skills skillTitle="General:" skills={[
                                {name: "Physics", percentage: "99", startColor: "#124050", endColor: "#9dd2da"},
                                {name: "Analytics", percentage: "75", startColor: "#124050", endColor: "#9dd2da"},
                                {name: "Statistics", percentage: "75", startColor: "#124050", endColor: "#9dd2da"},
                                {name: "IT management", percentage: "50", startColor: "#124050", endColor: "#9dd2da"}
                            ]
                            } 
                            />
                        </div>
                        <div class={constResponsiveClassesSkills}>
                            <Skills skillTitle="Development:" skills={[
                                {name: "Java / JavaScript", percentage: "75", startColor: "#1ba450", endColor: "#9eb8aa"},
                                {name: "CSS / HTML", percentage: "75", startColor: "#1ba450", endColor: "#9eb8aa"},
                                {name: "Python / C", percentage: "25", startColor: "#1ba450", endColor: "#9eb8aa"},
                                {name: "R / LateX / LabView", percentage: "25", startColor: "#1ba450", endColor: "#9eb8aa"},
                            ]
                            } 
                            />
                        </div>
                        <div class={constResponsiveClassesSkills}>
                            <Skills skillTitle="Characteristics:" skills={[
                                {name: "Mediator", percentage: "99", startColor: "#0e93a8", endColor: "#9dd2da"},
                                {name: "Responsible", percentage: "99", startColor: "#0e93a8", endColor: "#9dd2da"},
                                {name: "Communication", percentage: "75", startColor: "#0e93a8", endColor: "#9dd2da"},
                                {name: "Conscientious", percentage: "75", startColor: "#0e93a8", endColor: "#9dd2da"}
                            ]
                            } 
                            />
                        </div>
                        <div class={constResponsiveClassesSkills}>
                            <Skills skillTitle="Languages:" skills={[
                                {name: "German", percentage: "99", startColor: "#0e93a8", endColor: "#9dd2da"},
                                {name: "English (C2)", percentage: "99", startColor: "#0e93a8", endColor: "#9dd2da"},
                                {name: "Norwegian", percentage: "25", startColor: "#0e93a8", endColor: "#9dd2da"},
                                {name: "French", percentage: "25", startColor: "#0e93a8", endColor: "#9dd2da"}
                            ]
                            } 
                            />
                        </div>
                    </div>  
                </div>
                <div className="workexperienceRow row">
                    <div className="col col-lg-6 col-12">
                        <ResumeTitle icon={workExperienceIcon} alt="Work experience icon" title="WORK EXPERIENCE" />
                        <ProfileWorkEntry rowClasses="border-top" time="Since 08/2019:" 
                                            company="Norwegian Red Cross, Oslo" 
                                            title="Tech-Lead, community based surveillance (CBS) project" 
                                            tasks="Lead of the technical development of an open source CBS platform. Coordination of stakeholders in an interdisciplinary team and international environment."/>
                        <ProfileWorkEntry time="05/2019 - 06/2019:" 
                                            company="Freelance project, University of Innsbruck, Austria" 
                                            title="System-Architect / Developer" 
                                            tasks="Development of a prototype instrument to capture 2D infrared thermal images in ice caves."/>
                        <ProfileWorkEntry time="05/2018 - 05/2019:" 
                                        company="3Banken IT GmbH" 
                                        title="Java Web Developer" 
                                        tasks="Full-Stack Software Development. Stakeholder communication.Technical specifications. "/>
                        <ProfileWorkEntry time="10/2016 - 12/2017" 
                                            company="Doppelmayr Cable Car GmbH" 
                                            title="ICT-Systems-Integrator/-Engineer" 
                                            tasks="Systems-engineering/-integrations. Coordination between stakeholders. Project coordination."/>
                        <ProfileWorkEntry time="10/2015 - 12/2015" 
                                            company="Rhein-Neckar-Zeitung (Journal), Heidelberg" 
                                            title="Internship &amp; Freelance writing" 
                                            tasks=""/>             
                        <ProfileWorkEntry time="08/2015 - 09/2015:" 
                                            company="Institute of Environmental Physics, Heidelberg" 
                                            title="Research assistant" 
                                            tasks="Development of the Software &amp; Hardware of a spectroscopic measurement instrument."/>  
                        <ProfileWorkEntry time="10/2013 - 02/2015:" 
                                            company="Kirchhoff-Institute for Physics, Heidelberg" 
                                            title="Tutor"/>     
                    </div>
                
                    <div className="col col-lg-6 col-12">
                        <ResumeTitle icon={educationIcon} alt="Education icon" title="EDUCATION" />
                        <ProfileWorkEntry rowClasses="border-top" time="08/2012 - 05/2015:" 
                                                company="University of Heidelberg, Germany" 
                                                title="M. Sc. Physics (Focus: Environmental Physics)" 
                                                tasks="Master thesis: Enhancement and rebuild of a compact long path DOAS instrument. The purpose of the master thesis was to further develop and implement a mobile spectroscopic instrument to measure atmospheric trace gases and analyse first measurements."/>
                        <ProfileWorkEntry  time="08/2009 - 08/2012:" 
                                                company="University of Heidelberg, Germany" 
                                                title="B. Sc. Physics (Focus: Medical-/Bio- and Astrophysics)" 
                                                tasks="Thesis about the fine tuning of physical constants to the emergence of life and alternatives to carbon as a basis for life."/>
                        <ProfileWorkEntry  time="06/2009:" 
                                            company="University of Heidelberg, Germany" 
                                            title="B. Sc. Physics (Focus: Medical-/Bio- and Astrophysics)" 
                                            tasks="Thesis about the fine tuning of physical constants to the emergence of life and alternatives to carbon as a basis for life."/>
                    </div>
                </div>
            </div>
    );}
}