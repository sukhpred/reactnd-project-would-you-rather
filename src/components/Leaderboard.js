import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render() {
    
    const { users } = this.props
	
    return (
      <div className="leaderboard">
      	<ul>
      	{users.map((user) => (
    		<li key={user.id} className="details">
				<div className="col-left">
                    <img src={user.avatarURL} className="user-avatar" alt={`${user.name} Avatar`} />
                </div>
                <div className="col-middle">
                    <p>{user.name}</p>
                    <p>Answered Questions: {user.totalAnswer}</p>
                    <p>Created Questions: {user.totalQuestion}</p>
                </div>
                <div className="col-right">
                    <span>Score: {user.score}</span>      
                </div>
      		</li>
    	))}
      	</ul>
      </div>
    )
  }
}

function mapStateToProps({users}){
	const boardUsers = Object.values(users);
    
    for(const user of boardUsers){
    	user.totalAnswer = Object.keys(user.answers).length
        user.totalQuestion = user.questions.length
        user.score = user.totalAnswer + user.totalQuestion
    }
    
	return {
		users: boardUsers.sort((a,b) => b.score - a.score),
	}
}

export default connect(mapStateToProps)(Leaderboard)