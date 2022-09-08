/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUsers } from '../store/user'

const style={display:"flex", fontSize:"3ch", flexFlow:"row nowrap", color:"white", lineHeight:0, justifyContent:"space-between"}
class Main extends Component {
  constructor () {
    super()
    this.state = {
      minimum: 0,
      users: [],
      betStarted: false,
      selectedUser:""
    }
  }
  componentDidMount= async ()=>{
   let newUsers= await this.props.fetchUsers()
    // eslint-disable-next-line react/no-unused-state
    this.setState({ users: newUsers })
    console.log(newUsers)
  }
  startBet = () => {
    axios.get("/api/bet/startBet/" + this.state.minimum)
    this.setState({ betStarted: true })
  }
  finishBet = async () => {
    
    console.log()
    axios.get("/api/bet/winBet/" + this.state.selectedUser)
    await this.props.fetchUsers();
        this.setState({ betStarted: false, users:this.props.users })

  }
    handleChange = (evt) => {
    this.setState({[evt.target.name]:evt.target.value})
    }
  refresh = async () => {
      let newUsers= await this.props.fetchUsers()
    // eslint-disable-next-line react/no-unused-state
    this.setState({ users: newUsers })
    console.log(newUsers)
  }

 
  render () {
    return (
      <div style={{ display: "flex", flexFlow: "column", justifyContent: "center", color: "white" }}>
        
       {this.props.users.map(user=>{
         return (
           <div style={style} key={user.name}><p>{user.name}</p><p style={{paddingLeft:"2ch"}}/><p>{ user.score}</p></div>
        )
       })}
         <div style={{ display: "flex", flexFlow: "column", justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
          <button type="button" onClick={this.refresh}>Refresh</button>
        </div>
        {!this.state.betStarted ? <div style={{ display: "flex", flexFlow: "column", justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
          <input type='number' onChange={this.handleChange} value={this.state.minimum} name='minimum' />
          <button type="button" onClick={this.startBet}>Start</button>
        </div> : null}
        {this.state.betStarted?
            <div style={{ display: "flex", flexFlow: "column", justifyContent: 'center', alignItems: 'center', width: '100vw' }}>      <label>
            Winner
            <select value={this.state.selectedUser} name='selectedUser' onChange={this.handleChange}>
              {
                this.props.users.map(u => {
                  console.log(u);
                  return (
                    <option key={u.name} value={u.name}>{u.name}</option>
                  )
                })
              }
        </select>
            </label>
            <button type="button" onClick={this.finishBet}>Finish</button>
    </div>:null}
      </div>
      
    )
  }
}
const mapState = state => {
  return {
    users:state.user
  }
}
const mapDispatch = dispatch => {
  return {
    fetchUsers () {
      dispatch(fetchUsers())
    }
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Main)
)