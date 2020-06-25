import React from 'react'
import {Link} from 'react-router-dom'
import Delete from './delete.js'
import Can from './can.js'
import { userContext } from './userContext'

export default class ContentControls extends React.Component {
  render () {
    return(
      <div className='content-controls'>
      { this.props.type === 'post' && <div>
      <Link className='post-card-comments-link' to={this.props.path}>{this.props.comments_count} comments</Link>
      </div> }
      { this.props.type ==='comment' && <div><a href="#"onClick={this.props. showCommentForm}>Reply</a></div> }
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
