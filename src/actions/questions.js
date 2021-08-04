import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addQuestionToUser, addAnswerToUser } from '../actions/users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question
	}
}

export function handleAddQuestion (optionOneText, optionTwoText) {
	return (dispatch, getState) => {
		const { authedUser } = getState()
		
		dispatch(showLoading())
		
		return saveQuestion({
			author: authedUser,
			optionOneText,
            optionTwoText
		})
		.then((question) => {
          	dispatch(addQuestion(question))
          	dispatch(addQuestionToUser(question.id, authedUser))
         })
		.then(() => dispatch(hideLoading()))
	}
}

export function receiveQuestions(questions){
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	}
}

function addQuestionAnswer(qid, answer, authedUser) {
	return {
		type: SAVE_QUESTION_ANSWER,
		qid, 
      	answer,
      	authedUser
	}
}

export function handleSaveQuestionAnswer (qid, answer) {
	return (dispatch, getState) => {
		const { authedUser } = getState()
		
		dispatch(showLoading())
		
		return saveQuestionAnswer({
			authedUser,
			qid, 
          	answer
		})
		.then(() => { 
          	dispatch(addQuestionAnswer(qid, answer, authedUser))
          	dispatch(addAnswerToUser(qid, answer, authedUser))
        })
		.then(() => dispatch(hideLoading()))
	}
}