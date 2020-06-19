import React from 'react'
import { Modal } from 'react-bootstrap'
import PostForm from './postForm.js'

export default class PostModal extends React.Component {
  
  render () {
    return (
      <Modal show={this.props.show} onHide={this.props.hideModal}>
        <Modal.Header closeButton>New Post</Modal.Header>
        <Modal.Body>
          <PostForm hideModal={this.props.hideModal}/>
        </Modal.Body>
      </Modal>
    )
  }
}