import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render() {
    
    const { users } = this.props
	
    return (
      <div className="leaderboard">
      	<ul>
      	{Object.values(users).map((user) => (
    		<li key={user.id} className="details">
				<div className="col-left">
                    <img src={user.avatarURL} className="user-avatar" alt={`${user.name} Avatar`} />
                </div>
                <div className="col-middle">
                    <ol>
                    	<li>{user.name}</li>
                        <li>Answered Questions: {Object.keys(user.answers).length}</li>
                        <li>Created Questions: {user.questions.length}</li>
                    </ol>    
                </div>
                <div className="col-right">
                    <span>Score: {(Object.keys(user.answers).length + user.questions.length)}</span>      
                </div>
      		</li>
    	))}
      	</ul>
      </div>
    )
  }
}

function mapStateToProps({users}){
	return {
		users
	}
}

export default connect(mapStateToProps)(Leaderboard)