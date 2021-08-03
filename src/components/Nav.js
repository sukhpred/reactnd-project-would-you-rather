import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
  handleLogout = (e) => {
  	e.preventDefault()
    const { dispatch } = this.props
	dispatch(setAuthedUser(null))
    return <Redirect to='/login' />
  }
  
  render() {  
    const { users, authedUser} = this.props
	return(
		<nav className='nav'>
			<ul>
				<li key="home">
					<NavLink to='/' exact activeClassName='active'>
						Home
					</NavLink>
				</li>
				<li key="new-question">
					<NavLink to='/add' activeClassName='active'>
						New Question
					</NavLink>
				</li>
      			<li key="learderboard">
					<NavLink to='/leaderboard' activeClassName='active'>
						Leader Board
					</NavLink>
				</li>
      		</ul>
            {this.props.showLogout === true && 
            (<ul>
      			<li key="user-info">
                  Hello {users[authedUser].name}
                </li>
                <li key="logout" onClick={this.handleLogout}>
                  Logout
                </li>
    		</ul>)
        	}
			
		</nav>
	)
  }
}

function mapStateToProps({authedUser, users}){
	return {
      showLogout: authedUser !== null,
      users,
      authedUser
	}
}

export default connect(mapStateToProps)(Nav)