import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Poll from './Poll'
import AnswerQuestion from './AnswerQuestion'

class Question extends Component {
  
  render() {
	const { id, qtype} = this.props
    
    if(qtype === '') {
    	return <Redirect to='/' />
    }
    
    return(
      <div className="question-section">
      {qtype === 'answered'
       ? <Poll id={id} />
       : <AnswerQuestion id={id} />}
      </div>
    )
  }
}

function mapStateToProps({authedUser, questions}, props){
    const { id } = props.match.params
	const question = questions[id]
	let qtype = '';
    
  	if(question) {
      if(question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)){
          qtype = 'answered'
      } else {
          qtype = 'unanswered'
      }
    }

	return {
		id,
        qtype
	}
}

export default connect(mapStateToProps)(Question)