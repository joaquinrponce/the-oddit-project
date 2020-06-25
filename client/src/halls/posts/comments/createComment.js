import React from 'react'
import CommentForm from './commentForm'
import { userContext } from '../../../userContext.js'

export default class CreateComment extends React.Component {

  handleSubmit = (comment) => {
    const request = {
      comment: {
        user_id: this.context.user.id,
        commentable_id: this.props.commentableId,
        commentable_type: this.props.commentableType,
        body: comment
      }
    }
    fetch(`/api/comments`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.context.user.token },
      body: JSON.stringify(request)
    }).then(response => {
      if (response && response.ok) {
        return response.json()
      } else {
        console.log('error')
      }
    }).then(response => {
      this.props.updateParent(response)
    }
    )
      .catch(error => console.log(error))
  }

  render () {
    return(
      <CommentForm header={'Reply'} handleSubmit={this.handleSubmit}/>
    )
  }
}

CreateComment.contextType = userContext
