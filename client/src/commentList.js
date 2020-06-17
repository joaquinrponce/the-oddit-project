import React from 'react'
import Comment from './comment.js'

export default class CommentList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div className='comment-list'>
      {this.props.comments.map(comment => {
        return <Comment className={`indent-${this.props.indent} mt-2 mb-2 mr-2`} indent={this.props.indent + 1} key={comment.id} comment={comment}/>
      })}</div>
    )
  }
}
