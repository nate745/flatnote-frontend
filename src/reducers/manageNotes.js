export default function manageNotes(state = {
  currentUser: {},
  notes:[],
  note: {},
  renderedNote: undefined,
  renderedEdit: undefined
}, action) {
  switch(action.type) {
    
    case 'ADD_USER':
      return Object.assign({}, state, {
        currentUser: {
          username: action.userInfo.username,
          id: action.userInfo.id,
        },
        notes: action.userInfo.notes
      })

      case 'LOG_OUT':
        return Object.assign({}, state, {
          renderedNote: undefined,
          renderedEdit: undefined
        })

      case 'ADD_NOTE':
        return Object.assign({}, state, {
          notes: [...state.notes, action.noteInfo],
          renderedNote: undefined
        })

      case 'SHOW_NOTE':
        return Object.assign({}, state, {
          renderedNote: action.id
        })

      case 'DELETE_NOTE':
        return Object.assign({}, state, {
          notes: [...state.notes.filter(note => note.id !== action.id)],
          renderedNote: undefined
        })

      case 'SHOW_EDIT':
        return Object.assign({}, state, {
          renderedEdit: action.id
        })

        case 'EDIT_NOTE':
          let newNotes = state.notes.map(note => {
            if(note.id === action.note.id){
              return action.note
            } else {
              return note
            }
          })
          return Object.assign({}, state, {
            notes: newNotes,
            renderedEdit: undefined,
            renderedNote: undefined
          })

    default:
      return state
  }
}