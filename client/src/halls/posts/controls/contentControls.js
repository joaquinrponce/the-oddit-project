import React from 'react'
import PostControls from './postControls.js'
import CommentControls from './commentControls.js'
import Delete from './delete.js'
import Can from '../../permissions/can.js'
import { userContext } from '../../../userContext.js'

export default class ContentControls extends React.Component {
  render () {
    return(
      <div className='content-controls'>
      { this.props.type === 'post' && <PostControls type='post' path={this.props.path} commentsCount={this.props.comments_count}/> }
      { this.props.type === 'comment' && <CommentControls data={{userId: this.context.user.id, authorId: this.props.id}} type='comment' showCommentForm={this.props.showCommentForm} showEditForm={this.props.showEditForm}/> }
      <Can
      role={this.context.user.role}
      perform={`${this.props.type}s:destroy`}
      data={{userId: this.context.user.id, authorId: this.props.id}}
      no={null}
      yes={<Delete id={this.props.id} path={this.props.path}/>}/>
      </div>
    )
  }
}

ContentControls.contextType = userContext
