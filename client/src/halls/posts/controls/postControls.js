import React from 'react'
import {Link} from 'react-router-dom'
import { userContext } from '../../../userContext.js'


export default class PostControls extends React.Component {
  render () {
    return(
      <div className='content-control'>
      <Link className='control-button' to={this.props.path}>{this.props.commentsCount} comments</Link>
      </div>
    )
  }
}
