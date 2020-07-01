import React from 'react'
import {Modal} from 'react-bootstrap'
import AddModeratorForm from './addModeratorForm.js'
import RemoveModeratorForm from './removeModeratorForm.js'

export default class AddModerator extends React.Component {
  render() {
    return(
      <Modal show={this.props.show} onHide={this.props.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>{ this.props.type === 'add' ? 'Add Moderator' : 'Remove Moderator'}</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            { this.props.type === 'add' ? <AddModeratorForm hideModal={this.props.hideModal} hallId={this.props.hallId}/> : <RemoveModeratorForm hideModal={this.props.hideModal} moderationships={this.props.moderationships}/> }
          </Modal.Body>
      </Modal>
    )
  }
}
