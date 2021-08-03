import '../App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import Login from './Login'
import Dashboard from './Dashboard'
import Question from './Question'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'

class App extends Component {
  componentDidMount(){
	  this.props.dispatch(handleInitialData())
  }
  
  render() {
    return (
      <Router>
      	<div>
      		<LoadingBar />
      		<div className='App'>
				<Nav />
      			{this.props.authedUser === null 
        		? <Login />
      			: <div>
					 <Route path='/login' component={Login} />
					 <Route path='/' exact component={Dashboard} />
					 <Route path='/questions/:id' component={Question} />
					 <Route path='/add' component={NewQuestion} />
					 <Route path='/leaderboard' component={Leaderboard} />
				   </div>}
      		</div>
		</div>
      </Router>
    )
  }
}

function mapStateToProps({authedUser}){
	return {
		authedUser
	}
}

export default connect(mapStateToProps)(App)