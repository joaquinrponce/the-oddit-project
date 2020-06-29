import React from 'react'
import EditButton from './editButton.js'
import Reply from './reply.js'
import Can from '../../permissions/can.js'
import { userContext } from '../../../userContext.js'

export default class CommentControls extends React.Component {
  render () {
    return(
      <>
      <Can
      role={this.context.user.role}
      perform={`${this.props.type}s:create`}
      no={null}
      yes={<Reply onClick={this.props.showCommentForm}/>}/>
      <Can
      role={this.context.user.role}
      perform={`${this.props.type}s:edit`}
      data={this.props.data}
      no={null}
      yes={<EditButton onClick={this.props.showEditForm}/>}/>
      </>
    )
  }
}

CommentControls.contextType = userContext
