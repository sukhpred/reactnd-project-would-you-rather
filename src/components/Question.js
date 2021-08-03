import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Poll from './Poll'
import AnswerQuestion from './AnswerQuestion'

class Question extends Component {
  
  render() {
	const { id, qtype} = this.props
    
    return(
      <Link to={`/questions/${id}`}  className="question-section">
      {qtype === 'answered'
       ? <Poll id={id} />
       : <AnswerQuestion id={id} />}
      </Link>
    )
  }
}

function mapStateToProps({authedUser, questions}, { id }){
	const question = questions[id]
	let qtype = '';
    
    if(question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)){
    	qtype = 'answered'
    } else {
    	qtype = 'unanswered'
    }
	
	return {
		id,
        qtype
	}
}

export default withRouter(connect(mapStateToProps)(Question))