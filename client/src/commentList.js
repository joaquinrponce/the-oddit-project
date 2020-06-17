import React from 'react'
import Comment from './comment.js'

export default class CommentList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div>
      {this.props.comments.map(comment => {
        return <Comment key={comment.id} comment={comment}/>
      })}</div>
    )
  }
}
