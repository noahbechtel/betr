import React, { Component } from 'react'
import { projects } from '../support/projects'
import Github from './github'

class MyProjects extends Component {
  constructor () {
    super()
  }
  render () {
    return (
      <div id='project'>
        <h1>Some Things I've Been Working On</h1>

        <div id='projects'>
          {projects.map(p => {
            return (
              <div
                className='singleProject'
                key={p.url}
                onClick={() => {
                  this.setState({ selected: p.name })
                }}
              >
                <div>
                  <img src={p.img} />
                  <h1>{p.name}</h1>
                  <span />
                  <h2>{p.desc}</h2>
                  <a href={p.url}>Launch</a>
                </div>
                <span />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default MyProjects
