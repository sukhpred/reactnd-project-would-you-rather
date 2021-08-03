import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class QuestionPage extends Component {
  
  handlePoll = (e) => {
  	e.preventDefault()

    const { id } = this.props
    
    return (<Redirect to={`/questions/${id}`} />)
  }
  
  render() {
	const { id, user, answerText} = this.props
    
    return(
      <li key={id}>
      	<div className="question-section">
          <div className="header">
          	<h3>{user.name} asks:</h3>
    	  </div>
    	  <div className="details">
            <div className='col-left'>
                <img src={user.avatarURL} className="user-avatar" alt={`${user.name} Avatar`} />
            </div>
            <div className='col-right'>
                <h4>Would you rather</h4>
                <p>{answerText}</p>
                <button onClick={this.handlePoll}>View Poll</button>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

function mapStateToProps({users, questions}, { id }){
	const question = questions[id]
	const user = users[question.author]
    const answerText = question.optionOne.text
	
	return {
		id,
		user,
        answerText: '...' + (answerText.length > 15 ? answerText.substr(0,15) : answerText) + '...'
	}
}

export default connect(mapStateToProps)(QuestionPage)