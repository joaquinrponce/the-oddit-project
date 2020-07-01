import React from 'react'
import PostControls from './postControls.js'
import CommentControls from './commentControls.js'
import HallControls from './hallControls.js'
import { userContext } from '../../../userContext.js'

export default class ContentControls extends React.Component {

  render () {
    return(
      <div className='content-controls'>
      { this.props.type === 'post' && <PostControls path={this.props.path} postCard={this.props.postCard} showEditForm={this.props.showEditForm} commentsCount={this.props.comments_count} data={{userId: this.context.user.id, authorId: this.props.id, hallId: this.props.hallId, moderatedHalls: this.context.user.moderated_halls}}/> }
      { this.props.type === 'comment' && <CommentControls path={this.props.path} data={{userId: this.context.user.id, authorId: this.props.id, hallId: this.props.hallId, moderatedHalls: this.context.user.moderated_halls}} showCommentForm={this.props.showCommentForm} showEditForm={this.props.showEditForm}/> }
      { this.props.type === 'hall' && <HallControls path={this.props.path} toggleModal={this.props.toggleModal} data={{userId: this.context.user.id, ownerId: this.props.id, hallId: this.props.hallId, moderatedHalls: this.context.user.moderated_halls}}/>}
      </div>
    )
  }
}

ContentControls.contextType = userContext
