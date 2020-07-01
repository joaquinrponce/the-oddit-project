import React from 'react'
import {Link} from 'react-router-dom'
import ControlButton from './controlButton.js'
import Delete from './delete.js'
import Can from '../../permissions/can.js'
import { userContext } from '../../../userContext.js'


export default class PostControls extends React.Component {
  render () {
    return(
      <>
      {this.props.path && <Link className='control-button' to={this.props.path}>{this.props.commentsCount} comments</Link> }
      { !this.props.postCard && <Can
      role={this.context.user.role}
      perform={`posts:edit`}
      data={this.props.data}
      no={null}
      yes={<ControlButton text='Edit' onClick={this.props.showEditForm}/>}/> }
      <Can
      role={this.context.user.role}
      perform={`posts:destroy`}
      data={this.props.data}
      no={null}
      yes={<Delete path={this.props.path}/>}/>
      </>
    )
  }
}

PostControls.contextType = userContext
