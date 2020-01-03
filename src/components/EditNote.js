import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editNote } from '../actions/notes'

class EditNote extends Component {
  
  state = {
      title: this.props.note.title,
      content: this.props.note.content
  }


  handleChange = (e) => {
    const { value, name } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    (e).preventDefault()
    this.fetchEditNote()
  }

  fetchEditNote = () => {
    const configObj = 
    { 
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content
      })
    }

    fetch(`http://localhost:3000/notes/${this.props.note.id}`, configObj)
    .then(resp => resp.json())
    .then(note => {
      this.props.editNote(note)
    })
    this.setState({ 
      title: this.props.note.title, 
      content: this.props.note.content 
    })
  }

  render() {
    return (
    <div className="boxed">
      <h3>Edit Note</h3>
      <form onSubmit ={this.handleSubmit}> 
        Title <br></br>
        <input type='text' name='title' value={this.state.title} onChange={this.handleChange}/><br></br><br></br>
        Content <br></br>
        <textarea name="content" cols="40" rows="2" value={this.state.content} onChange={this.handleChange}/><br></br>
        <input value='Save' type='submit'/>
      </form>
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  editNote: note => dispatch(editNote(note))
})

export default connect(null, mapDispatchToProps)(EditNote)