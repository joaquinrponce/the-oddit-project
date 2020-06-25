import React from 'react'
import { userContext } from './userContext.js'

export default class Delete extends React.Component {

  handleClick = (e) => {
    e.preventDefault()
    fetch(`/api${this.props.path}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json',
                 'Authorization': 'Bearer ' + this.context.user.token}
    }).then(response => {
      if (response && response.ok) {
        window.location.reload()
        return
      } else {
        console.log(response)
      }
    })
  }
  render () {
    return (
      <div>
      <a href="#" onClick={this.handleClick}>Delete</a>
      </div>
    )
  }
}

Delete.contextType = userContext
