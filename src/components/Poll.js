import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ProgressBar } from 'react-bootstrap'

class Poll extends Component {
  
  render() {
    const { user, question, usercount, authedUser } = this.props
    const optionOnePoll = parseInt((question.optionOne.votes.length / usercount) * 100)
    const optionTwoPoll = parseInt((question.optionTwo.votes.length / usercount) * 100)
    
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
                        	<span>Would you rather {question.optionOne.text}?</span>
                            <span>{optionOnePoll}%</span>
                            { question.optionOne.votes.includes(authedUser) && (<span>Your Vote</span>)}
                        </div>
                    </li>
                    <li>
                    	<div className="option-two">
                        	<span>Would you rather {question.optionTwo.text}?</span>
                            <span>{optionTwoPoll}%</span>
                            { question.optionTwo.votes.includes(authedUser) && (<span>Your Vote</span>)}
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