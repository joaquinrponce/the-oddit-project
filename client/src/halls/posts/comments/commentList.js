import React from 'react'
import Comment from './comment.js'

export default class CommentList extends React.Component {

  render() {
    return (<div className='comment-list'>
      {this.props.comments.map(comment => {
        return <Comment hallId={this.props.hallId} className={`indent-${this.props.indent} mt-2 mb-2 mr-2`} indent={this.props.indent + 1} key={comment.id} comment={comment}/>
      })}</div>
    )
  }
}
