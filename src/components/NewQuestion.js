import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'

class NewQuestion extends Component {
  state = {
	  optionOneText: '',
      optionTwoText: '',
  }
  
  handleChange = (e) => {
	  const text = e.target.value
      const name = e.target.name
      
      if(name === 'optionOne'){
        this.setState(() => ({
            optionOneText: text
        }))
      } else if(name === 'optionTwo') {
        this.setState(() => ({
            optionTwoText: text
        }))
      }
	  
  }
  
  handleSubmit = (e) => {
	  e.preventDefault()
	  
	  const { optionOneText, optionTwoText } = this.state
	  
	  const { dispatch } = this.props
	  
	  dispatch(handleAddQuestion(optionOneText, optionTwoText))
      dispatch(handleInitialData())
	  
	  this.setState(() => ({
		  optionOneText: '',
		  optionTwoText: '',
	  }))
        
      return <Redirect to='/' />
  }
  
  render() {
    
    const { optionOneText, optionTwoText } = this.state
	
    return (
      <div className="question-section">
          <div className="header">
          	<h3 className='center'>Create New Question</h3>
    	  </div>
    	  <div className="details">
      		<h5 className='center'>Complete The Question</h5>
            <form className='new-question' onSubmit={this.handleSubmit}>
			<h4>Would you rather</h4>
    		<input 
				placeholder="Enter Option One Text Here.."
				value={optionOneText}
				onChange={this.handleChange}
				name="optionOne"
			/>
            OR
    		<input 
				placeholder="Enter Option Two Text Here.."
				value={optionTwoText}
				onChange={this.handleChange}
				name="optionTwo"
			/>
			<button
				className='btn'
				type='submit'
				disabled={(optionOneText === '' || optionTwoText === '')}
			>
			  Submit
			</button>
			</form>
          </div>
       </div>
    )
  }
}

export default connect()(NewQuestion)