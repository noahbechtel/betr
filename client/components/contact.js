import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class Contact extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      name: '',
      message: '',
      sent: false
    }
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit = async evt => {
    const { email, message, name } = this.state
    evt.preventDefault()
    this.setState({ sent: 'loading' })
    if (email !== '' && message !== '') {
      try {
        await axios.post(`/api/messages`, {
          email,
          name,
          message
        })
      } catch (err) {
        this.setState({ sent: false })
      }
      this.setState({ sent: 'sent', email: '', message: '', name: '' })
    } else {
      this.setState({ sent: 'Please Fill Contact Fields' })
    }
  }

  render = () => {
    const { email, message, name, sent } = this.state
    return (
      <div id='contact'>
        {sent === 'sent' ? (
          <div className='form'>
            <div className='thanks'>
              <h1>Thank you!</h1>
              <div id='aboutMe'>I'll Be in touch with you shortly!</div>
            </div>
          </div>
        ) : (
          <div className='form'>
            <h1>Let's Get In Touch</h1>
            <form onSubmit={this.handleSubmit}>
              <div className='info'>
                <p>Email</p>
                <input
                  onChange={this.handleChange}
                  type='email'
                  name='email'
                  value={email}
                />
                <p>Name</p>
                <input
                  onChange={this.handleChange}
                  type='text'
                  name='name'
                  value={name}
                />
              </div>

              <div className='message'>
                <p>Message</p>
                <textarea
                  onChange={this.handleChange}
                  type='text'
                  name='message'
                  value={message}
                />
              </div>
              <button type='submit'>{!sent ? 'Send' : sent}</button>
            </form>
          </div>
        )}
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    send (state) {
      dispatch(send(state))
    }
  }
}

export default withRouter(
  connect(
    null,
    mapDispatch
  )(Contact)
)
