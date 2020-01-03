import React, { Component } from 'react';
import EditNote from './EditNote'
import { connect } from 'react-redux'
import { deleteNote, showEdit } from '../actions/notes'
import { withRouter } from 'react-router'

class NoteCard extends Component {

  handleNoteDelete = (note) => {
    const configObj = 
    {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      }
    }

    fetch(`http://localhost:3000/notes/${note.id}`, configObj)
    this.props.deleteNote(note)
    this.props.history.push('/dashboard')
  }

  handleEdit = (note) => {
    this.props.showEdit(note)
  }

  // showTags = () => {
  //   {this.props.note.tags.map(tag => {
  //     return <p>{tag.text}</p>
  //   })}
  // }

  render() {
    return (
      <div className='render-note'>
        {this.props.renderedEdit ? <EditNote key={this.props.note.id} note={this.props.note}/> :
          <div className='boxed'>
            <h3>{this.props.note.title}</h3>
              <p>{this.props.note.content}</p><br></br>
              <button onClick={() => this.handleEdit(this.props.note)}>Edit</button><br></br>
              <button onClick={() => this.handleNoteDelete(this.props.note)}>Delete</button><br></br><br></br>
              {/* <p>{this.showTags()}</p> */}
          </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  renderedEdit: state.renderedEdit
})

const mapDispatchToProps = (dispatch) => ({
  deleteNote: note => dispatch(deleteNote(note)),
  showEdit: note => dispatch(showEdit(note))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NoteCard))