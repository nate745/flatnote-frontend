import React, { Component } from 'react';
import NoteCard from './NoteCard'
import { connect } from 'react-redux'
import { showNote } from '../actions/notes'

class NoteList extends Component {

  render() {
    return (
      <div className="boxed"> 
        <h2>Notes</h2>
          {this.props.notes.map(note => {
          return (
            <div>
              <p onClick={() => this.props.showNote(note)}>{note.title}</p>
            </div>
          )
        })}
        {this.props.renderedNote ? <NoteCard note={this.props.notes.find(note => note.id === this.props.renderedNote)} showNote={this.props.showNote}/> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  renderedNote: state.renderedNote
})

const mapDispatchToProps = (dispatch) => ({
  showNote: note => dispatch(showNote(note))
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteList)