import React from 'react'
import { userContext } from './userContext.js'
import VoteButton from './voteButton.js'

export default class VoteController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {upvoted: false, downvoted: false, currentVote: null}
  }

  getVoteData = (id) => {
    fetch(`/api/votes/search?user_id=${id}&voteable_id=${this.props.voteableId}&voteable_type=${this.props.voteableType}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      else {
        return
      }})
    .then(response => {
      if (response && response.id) {
        const newState = JSON.parse(JSON.stringify(this.state))
        newState.currentVote = response
        newState.upvoted = response.value === 1 ? true : false
        newState.downvoted = response.value === -1 ? true : false
        newState.score = this.props.score
        this.setState(newState)
      } else {
        const newState = JSON.parse(JSON.stringify(this.state))
        newState.score = this.props.score
        this.setState(newState)
      }
    }).catch(error => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.getVoteData(this.context.user.id)
  }

  handleVote = (value) => {
    if (!this.context.loggedIn) {
      alert("you're not fucking logged in, you stupid little cunt, you absolute buffoon")
      return
    }
    if (this.state.currentVote) {
     this.updateVote(value, this.state.currentVote.id)
    } else {
     this.submitVote(value)
    }
  }

  submitVote = (value) => {
    const request = { vote: {
      user_id: this.context.user.id,
      voteable_type: this.props.voteableType,
      voteable_id: this.props.voteableId,
      value: value
    }
    }
    fetch(`/api/votes/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.context.user.token },
      body: JSON.stringify(request)
    })
    .then(response => {
      if (response) {
        return response.json()
      }
      else {
        return
      }})
    .then(response => {
      if (response.id) {
        const newState = JSON.parse(JSON.stringify(this.state))
        newState.currentVote = response
        newState.upvoted = response.value === 1 ? true : false
        newState.downvoted = response.value === -1 ? true : false
        newState.score = this.state.score += value
        this.setState(newState)
      } else {
        console.log('rofl')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  updateVote = (value, id) => {
    let newValue = value
    let newScore = this.state.score
    if ((value === 1 && this.state.upvoted) || (value === -1 && this.state.downvoted)) {
      newValue = 0
    }
    fetch(`/api/votes/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.context.user.token },
      body: JSON.stringify({vote: {value: newValue}})
    })
    .then(response => {
      if (response) {
        return response.json()
      }
      else {
        return
      }})
    .then(response => {
      if (response.id) {
        const newState = JSON.parse(JSON.stringify(this.state))
        newState.currentVote = response
        newState.upvoted = response.value === 1 ? true : false
        newState.downvoted = response.value === -1 ? true : false
        if (newValue === 0 && (this.state.upvoted || this.state.downvoted)) {
          newState.score += value * -1
        } else if (newValue !== 0 && (this.state.upvoted || this.state.downvoted)){
          newState.score += value * 2
        } else {
          newState.score += value
        }
        this.setState(newState)
      } else {
        console.log('rofl')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  render () {
    return (
      <div>
        <VoteButton active={this.state.upvoted} handleVote={this.handleVote} value={1}/>
        <div>{this.state.score}</div>
        <VoteButton active={this.state.downvoted} handleVote={this.handleVote} value={-1}/>
      </div>
    )
  }
}

VoteController.contextType = userContext
