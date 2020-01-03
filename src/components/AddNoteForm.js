import React, { Component } from 'react'
import Nav from '../Nav'
import { connect } from 'react-redux'
import { addNote } from '../actions/notes'

class AddNote extends Component {

    state = {
      title: '',
      content: ''
    }
  

  handleChange = (e) => {
    const { value, name } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.fetchNotes()
  }

  fetchNotes = () => {
    const configObj = 
    { 
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content,
        user_id: this.props.user.id
      })
    }

    fetch('http://localhost:3000/notes', configObj)
    .then(resp => resp.json())
    .then(note => {
      this.props.addNote(note)
      this.props.history.push('/dashboard')
    })
    this.setState({ 
      title: '', 
      content: ''
    })
  }

  render() {
    return (
    <div className="add-note">
      <Nav />
      <div className='render-note'>
        <h3>New Note</h3>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Title" className='render-note' type='text' name='title' value={this.state.title} onChange={this.handleChange}/><br></br><br></br>
          <textarea placeholder="Content" className='render-note' name="content" cols="40" rows="5" value={this.state.content} onChange={this.handleChange}/><br></br>
          <input value='Save' type='submit'/>
        </form>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  addNote: note => dispatch(addNote(note))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNote)