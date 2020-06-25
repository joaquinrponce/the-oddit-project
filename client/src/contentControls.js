import React from 'react'
import {Link} from 'react-router-dom'
import Delete from './delete.js'

export default class ContentControls extends React.Component {
  render () {
    return(
      <div className='post-card-controls'>
      <div>
      <Link className='post-card-comments-link' to={this.props.path}>{this.props.comments_count} comments</Link>
      </div>
      <Delete id={this.props.id} path={this.props.path}/>
      </div>
    )
  }
}
