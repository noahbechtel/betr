import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MyProjects from './myProjects'
import MySkills from './mySkills'
import AboutMe from './aboutMe'
import Contact from './contact'
import { projects } from '../support/projects'

class Main extends Component {
  constructor () {
    super()
  }
  render () {
    return (
      <div>
        {/* <img id='wallpaper' src='/background.jpeg' /> */}
        <div id='nav'>
          <a href='#project'>Projects</a>
          <a href='#me'>About</a>
          <a href='#skill'>Skills</a>
          <a href='#contact'>Contact</a>
        </div>
        <div id='body'>
          <div id='header'>
            <h1 id='name'>Noah Bechtel</h1>
            <h2 id='caption'>I am a fullstack JavaScript Developer.</h2>
            <a href='#projects'>Check Me Out</a>
          </div>
        </div>
        <MyProjects />
        <MySkills />
        <AboutMe />
        <Contact />
      </div>
    )
  }
}

export default Main
