import React from 'react'
import { Link } from 'react-router-dom'
import { Container} from 'react-bootstrap'
import Can from '../halls/permissions/can.js'
import Delete from '../halls/posts/controls/delete.js'
import { userContext } from '../userContext.js'

export default class ProfileComment extends React.Component {

  render() {
    return(
      <Container fluid className='comment profile-comment'>
        <div className='comment-content'>
          <div className='post-info text-muted'>
          Commented in 
          <Link to={`/halls/${this.props.comment.post.hall.name}/posts/${this.props.comment.post.id}`}> {this.props.comment.post.title}</Link> in
          <Link to={`/halls/${this.props.comment.post.hall.name}`}> {this.props.comment.post.hall.name}</Link>
          </div>
          <div className='comment-body'>
            {this.props.comment.body}
          </div>
          <div className='content-controls'>
          <Can
          role={this.context.user.role}
          perform={`comments:destroy`}
          data={{userId: this.context.user.id, hallId: this.props.comment.post.hall.id, authorId: this.props.userId, moderatedHalls: this.context.user.moderatedHalls}}
          no={null}
          yes={<Delete path={`/comments/${this.props.comment.id}`}/>}/>
          </div>
        </div>
      </Container>
    )
  }
}

ProfileComment.contextType = userContext
