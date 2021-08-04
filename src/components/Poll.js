import React, { Component } from 'react'
import { connect } from 'react-redux'

class Poll extends Component {
  
  render() {
    const { user, question, usercount, authedUser } = this.props
    const optionOneVotes = question.optionOne.votes.length
    const optionTwoVotes = question.optionTwo.votes.length
    const optionOnePoll = parseInt((optionOneVotes / usercount) * 100) + ''
    const optionTwoPoll = parseInt((optionTwoVotes / usercount) * 100) + ''
    
    return(
      <div  className="question-section">
          <div className="header">
          	<h3>Asked by {user.name}</h3>
    	  </div>
    	  <div className="details">
            <div className='col-left'>
                <img src={user.avatarURL} className="user-avatar" alt={`${user.name} Avatar`} />
            </div>
            <div className='col-right'>
                <h4>Results: </h4>
                <ol>
                	<li>
                    	<div className="option-one">
                        	<p>Would you rather {question.optionOne.text}?</p>
                            <p>Total Votes: {optionOneVotes}</p>
                            <p>{optionOnePoll}%</p>
                            { question.optionOne.votes.includes(authedUser) && (<p className="your-vote">Your Vote</p>)}
                        </div>
                    </li>
                    <li>
                    	<div className="option-two">
                        	<p>Would you rather {question.optionTwo.text}?</p>
                            <p>Total Votes: {optionTwoVotes}</p>
                            <p>{optionTwoPoll}%</p>
                            { question.optionTwo.votes.includes(authedUser) && (<p className="your-vote">Your Vote</p>)}
                        </div>
                    </li>
                </ol>
            </div>
          </div>
        </div>
    )
  }
}

function mapStateToProps({authedUser, users, questions}, { id }){
	const question = questions[id]
    const user = users[question.author]
	
	return {
      question,
      user,
      usercount: Object.values(users).length,
      authedUser
	}
}

export default connect(mapStateToProps)(Poll)