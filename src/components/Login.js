import React, { Component } from 'react'
import logo from '../images/logo.svg'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  state = {
	  userId: '',
	  toHome: false,
  }
  
  handleChange = (e) => {
	  const userId = e.target.value
	  this.setState(() => ({
		  userId
	  }))
  }
  
  handleSignIn = (e) => {
	  e.preventDefault()
	  
	  const { userId, toHome } = this.state
	  
	  if(toHome === true) {
		  return <Redirect to='/' />
	  }
	  
	  const { dispatch } = this.props
	  
	  dispatch(setAuthedUser(userId))
	  
	  this.setState(() => ({
		  userId: '',
		  toHome: userId ? false : true,
	  }))
  }
  
  render() {
    const { users } = this.props
    
    return (
      <div className='container' >
      	<div className='login-header'>
      		<h3>Welcome to the Would You Rather App!</h3>
            <span>Please sign in to continue</span>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
      	<br />
  		<select onChange={this.handleChange} value={this.state.userId}>
          <option value='' key=''>Select User</option>
  		  {Object.values(users).map((user) => (
          <option value={user.id} key={user.id}>{user.name}</option>
          ))}
        </select>
		<button className='btn'
			disabled={this.state.userId === ''}
			onClick={this.handleSignIn}
        >Sign in</button>
      </div>
    )
  }
}

function mapStateToProps({users}){
	return {
		users
	}
}

export default connect(mapStateToProps)(Login)