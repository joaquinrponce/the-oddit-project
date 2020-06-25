import React from 'react'
import { userContext } from './userContext.js'

export default class Delete extends React.Component {

  handleClick = (e) => {
    e.preventDefault()
    console.log(this.props.path)
    fetch(`/api${this.props.path}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json',
                 'Authorization': 'Bearer ' + this.context.user.token}
    }).then(response => {
      if (response && response.ok) {
        return
      } else {
        console.log(response)
      }
    })
  }
  render () {
    if (this.context.user.role !== 'admin' && this.context.user.id !== this.props.id) return null
    return (
      <div>
      <a href="#" onClick={this.handleClick} className='post-card-comments-link'>Delete</a>
      </div>
    )
  }
}

Delete.contextType = userContext
