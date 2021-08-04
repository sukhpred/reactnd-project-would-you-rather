import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionPage from './QuestionPage'

class Dashboard extends Component {
  state = {
    showAnswer: false
  }
  
  handleTabOption = (e) => {
  	const option = e.target.getAttribute('value')
    
    if(option === 'answered')
      this.setState(() => ({
      	showAnswer: true
      }))
    else
      this.setState(() => ({
      	showAnswer: false
      }))
  }
  
  render() {
    const { answerQuestion, unanswerQuestion } = this.props
    const showAnswer = this.state.showAnswer
    
    return(
    	<div className="dashboard">
      		<ul>
      			<li onClick={this.handleTabOption} value='unanswered'>Unanswered Questions</li>
      			<li onClick={this.handleTabOption} value='answered'>Answered Questions</li>
      		</ul>
      		<div className='question-list'>
      		<ul>
      		{showAnswer === true 
      			? (Object.values(answerQuestion).map( (question) => (
    				<QuestionPage id={question.id} key={question.id} />
    				)))
                : (Object.values(unanswerQuestion).map( (question) => (
    				<QuestionPage id={question.id} key={question.id} />
    				)))
      		}
            </ul>
      		</div>
      	</div>
    )
  }
}

function mapStateToProps({authedUser, questions}) {
	const answerQuestion = Object.values(questions)
    							 .filter((question) => (question.optionOne.votes.includes(authedUser)
                                        			|| question.optionTwo.votes.includes(authedUser)))
	const unanswerQuestion = Object.values(questions)
    							 .filter((question) => (!question.optionOne.votes.includes(authedUser)
                                        			&& !question.optionTwo.votes.includes(authedUser)))
	
	return {
	  answerQuestion : answerQuestion.sort((a,b) => b.timestamp - a.timestamp),
      unanswerQuestion : unanswerQuestion.sort((a,b) => b.timestamp - a.timestamp),
	}
}

export default connect(mapStateToProps)(Dashboard)