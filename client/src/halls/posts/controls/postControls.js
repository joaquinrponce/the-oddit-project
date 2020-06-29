import React from 'react'
import {Link} from 'react-router-dom'
import EditButton from './editButton.js'
import Can from '../../permissions/can.js'
import { userContext } from '../../../userContext.js'


export default class PostControls extends React.Component {
  render () {
    return(
      <div className='content-control'>
      {this.props.path && <Link className='control-button' to={this.props.path}>{this.props.commentsCount} comments</Link> }
      { !this.props.postCard && <Can
      role={this.context.user.role}
      perform={`${this.props.type}s:edit`}
      data={this.props.data}
      no={null}
      yes={<EditButton onClick={this.props.showEditForm}/>}/> }
      </div>
    )
  }
}

PostControls.contextType = userContext
