import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleSaveQuestionAnswer } from '../actions/questions'

class AnswerQuestion extends Component {
  state = {
	  toPoll: false,
      answer: ''
  }
  
  handleChange = (e) => {
	  e.preventDefault()
    
      const answer = e.target.value
      
      this.setState(() => ({
        answer
      }))
	  
  }
  
  handleSubmit = (e) => {
	  e.preventDefault()
	 
      const { dispatch, question } = this.props
      const { answer } = this.state
	  
	  dispatch(handleSaveQuestionAnswer(question.id, answer))
	  
	  this.setState(() => ({
		  toPoll: true,
      	  answer: ''
	  }))
  }
  
  render() {
    
    const { user, question } = this.props
    const { toPoll, answer } = this.state
    
    if(toPoll === true) {
		  return <Redirect to={`/questions/${question.id}`} />
	}
	
    return(
      <div className="question-section">
          <div className="header">
          	<h3>{user.name} asks:</h3>
    	  </div>
    	  <div className="details">
            <div className='col-left'>
                <img src={user.avatarURL} className="user-avatar" alt={`${user.name} Avatar`} />
            </div>
            <div className='col-right'>
                <form className='answer-question' onSubmit={this.handleSubmit}>
                <h4>Would you rather</h4>
                <input 
                	type="radio"
                    value="optionOne"
                    onChange={this.handleChange}
                    name="rather"
                    id="optionOne"
                />
                <label>{question.optionOne.text}</label>
                <br />
                <input 
                    type="radio"
                    value="optionTwo"
                    onChange={this.handleChange}
                    name="rather"
                    id="optionTwo"
                />
                <label>{question.optionTwo.text}</label>
                <br />
                <button
                    className='btn'
                    type='submit'
					disabled={answer === ''}
                >
                  Submit
                </button>
                </form>
            </div>
          </div>
        </div>
    )
  }
}

function mapStateToProps({ users, questions }, { id }){
	const question = questions[id]
	const user = users[question.author]
	
	return {
		user,
        question
	}
}

export default connect(mapStateToProps)(AnswerQuestion)