import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

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
		.then((question) => dispatch(addQuestion(question)))
		.then(() => dispatch(hideLoading()))
	}
}

export function receiveQuestions(questions){
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	}
}

function addQuestionAnswer(qid, answer) {
	return {
		type: SAVE_QUESTION_ANSWER,
		qid, 
      	answer
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
		.then(() => dispatch(addQuestionAnswer(qid, answer)))
		.then(() => dispatch(hideLoading()))
	}
}