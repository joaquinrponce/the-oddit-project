import React from 'react'
import { Button } from 'react-bootstrap'
import { userContext } from './userContext.js'

export default class SubscriptionButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {subscription: null, checked: false}
  }

  getSubscriptionData = () => {
    fetch(`/api/subscriptions/search?member_id=${this.context.user.id}&hall_id=${this.props.hall}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
      }
    }
    ).then(response => {
      if (response && response.id) {
        this.setState({subscription: response, checked: true})
      } else {
        this.setState({subscription: null, checked: true})
      }
    }).catch(error => console.log(error))
  }

  createSubscription = () => {
    const request = { subscription: {member_id: this.context.user.id, hall_id: this.props.hall}}
    fetch('/api/subscriptions', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {'Content-Type': 'application/json' }
      }).then( response => {
        console.log(response)
        if (response.ok) {
          return response.json()
        } else {
          return response.json()
        }
      })
      .then(response => {
        console.log(response)
        if (response.id) {
          this.setState({subscription: response, checked: true})
        }
      }).catch(error => console.log(error))
  }

  destroySubscription = () => {
    const request = { subscription: {member_id: this.context.user.id, hall_id: this.props.hall}}
    fetch(`/api/subscriptions/${this.state.subscription.id}`, {
      method: 'DELETE',
      body: JSON.stringify(request),
      headers: {'Content-Type': 'application/json' }
      })
      .then(response => 
        this.setState({subscription: null, checked: true})
      )
      .catch(error => console.log(error))
  }

  componentDidMount = () => {
    this.getSubscriptionData()
  }

  handleClick = () => {
    if (this.state.subscription) {
      this.destroySubscription()
    } else {
      this.createSubscription()
    }
  }

  render () {
    if (!this.state.checked) return null
    const text = this.state.subscription ? 'Leave' : 'Join'
    return(
      <Button variant='danger' onClick={this.handleClick}>{ text }</Button>
    )
  }
}

SubscriptionButton.contextType = userContext
