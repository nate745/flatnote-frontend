import React from 'react'
import { NavLink } from 'react-router-dom';
import { logoutUser } from './actions/userStatus'
import { connect } from 'react-redux'
 
const styling = {
  width: '100px',
  padding: '10px',
  margin: '0 6px 6px',
  background:  'black',
  textDecoration: 'none',
  color: 'white',
  float: 'right'
}
 
class Nav extends React.Component {

  handleLogout = () => {
    this.props.logoutUser()
  }

  render() {
    return (
      <div> 
        <NavLink to='/login' style={styling} onClick={this.handleLogout}>Logout </NavLink>
        <NavLink to='/note/new' style={styling}>Add Note </NavLink>
        <NavLink to='/dashboard' style={styling} onClick={this.handleLogout}>Home</NavLink>
        <h1 className='App'>FlatNote</h1>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser())
})

export default connect(null, mapDispatchToProps)(Nav)