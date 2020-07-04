import React from 'react'
import ControlButton from './controlButton.js'
import Delete from './delete.js'
import Can from '../../permissions/can.js'
import { userContext } from '../../../userContext.js'

export default class CommentControls extends React.Component {
  render () {
    return(
      <>
      { this.props.allowReply &&
      <Can
      role={this.context.user.role}
      perform={`comments:create`}
      no={null}
      yes={<ControlButton text='Reply' onClick={this.props.showCommentForm}/>}/> }
      <Can
      role={this.context.user.role}
      perform={`comments:edit`}
      data={this.props.data}
      no={null}
      yes={<ControlButton text='Edit' onClick={this.props.showEditForm}/>}/>
      <Can
      role={this.context.user.role}
      perform={`comments:destroy`}
      data={this.props.data}
      no={null}
      yes={<Delete path={this.props.path}/>}/>
      </>
    )
  }
}

CommentControls.contextType = userContext
