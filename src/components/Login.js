import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addUser } from '../actions/userStatus'

class Login extends Component {

  state = {
      username: '',
      notes: [],
      tags: []
    }
  

  handleChange = (e) => {
    this.setState({ 
      username: e.target.value 
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.fetchUser()
  }

  fetchUser = () => {
    const configObj = 
    { 
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        notes: this.state.notes,
        tags: this.state.tags
      })
    }

    fetch(`http://localhost:3000/users`, configObj)
    .then(resp => resp.json())
    .then(user => {
      console.log(user)
      this.props.addUser(user)
      this.props.history.push('/dashboard')
    })
    this.setState({ 
      username: '', 
      notes: [],
      tags: [] 
    })
  }

  render() {
    return (
    <form className='App-header' onSubmit={(event) => this.handleSubmit(event)} >
      <h1>FlatNote</h1>
      <input type="text" name="username" placeholder="Username" onChange={(event) => this.handleChange(event)}/><br></br>
      <input type="submit" value="Login" />
    </form>
    )}
}

const mapDispatchToProps = (dispatch) => ({
  addUser: user => dispatch(addUser(user))
})

export default connect(null, mapDispatchToProps)(Login)