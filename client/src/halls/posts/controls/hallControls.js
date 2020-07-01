import React from 'react'
import ControlButton from './controlButton.js'
import Delete from './delete.js'
import Can from '../../permissions/can.js'
import { userContext } from '../../../userContext.js'

export default class HallControls extends React.Component {

  render() {
    return(
      <div className='hall-mod-controls'>
      <Can
      role={this.context.user.role}
      perform={`halls:edit`}
      data={this.props.data}
      no={null}
      yes={<h5>Mod Controls</h5>}/>
      <Can
      role={this.context.user.role}
      perform={`halls:edit`}
      data={this.props.data}
      no={null}
      yes={<ControlButton text='Edit Sidebar' id={this.props.id} path={this.props.path}/>}/>
      <Can
      role={this.context.user.role}
      perform={`moderators:create`}
      data={this.props.data}
      no={null}
      yes={<ControlButton text='Add Moderator' onClick={() => this.props.toggleModal('add')}/>}/>
      <Can
      role={this.context.user.role}
      perform={`moderators:destroy`}
      data={this.props.data}
      no={null}
      yes={<ControlButton text='Obliterate Moderator' onClick={() => this.props.toggleModal('delete')}/>}/>
      <Can
      role={this.context.user.role}
      perform={`halls:destroy`}
      data={this.props.data}
      no={null}
      yes={<Delete path={this.props.path}/>}/>
      </div>
    )
  }
}

HallControls.contextType = userContext
