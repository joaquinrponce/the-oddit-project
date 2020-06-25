import React from 'react'
import CommentForm from './commentForm'
import { userContext } from '../../../userContext.js'

export default class EditComment extends React.Component {

  handleSubmit = (comment) => {
    const request = {
      comment: {
        body: comment
      }
    }
    fetch(`/api/comments/${this.props.commentableId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.context.user.token },
      body: JSON.stringify(request)
    }).then(response => {
      if (response && response.ok) {
        return response.json()
      } else {
        console.log('error')
      }
    }).then(response => {
      console.log(response)
      this.props.updateParent(response)
    }
    )
      .catch(error => console.log(error))
  }

  render () {
    return(
      <CommentForm body={this.props.body} header={'Edit'} handleSubmit={this.handleSubmit}/>
    )
  }
}

EditComment.contextType = userContext
