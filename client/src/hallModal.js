import React from 'react'
import { Modal } from 'react-bootstrap'
import HallForm from './hallForm.js'

export default class HallModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.toggle}>
        <Modal.Header closeButton>New Hall</Modal.Header>
          <Modal.Body>
            <HallForm/>
          </Modal.Body>
        </Modal>
    )
  }
}
