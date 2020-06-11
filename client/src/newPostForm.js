import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

export default class NewPostForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hall: '',
      title: '',
      url: '',
      body: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    e.preventDefault()
    e.persist()
    const newState = JSON.parse(JSON.stringify(this.state))
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  render() {
    return(
    <Modal show={this.props.show} onHide={this.props.hideModal}>
      <Modal.Header closeButton>New Post</Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => {
          e.preventDefault()
          this.props.handleSubmit({params: this.state})
        }}>
        <Form.Group controlId='postForm'>
          <Form.Label>Hall</Form.Label>
          <Form.Control as="select" name='hall'onChange={this.handleChange} multiple>
            <option>Valhalla</option>
            <option>Bifrost</option>
            <option>Folkvangr</option>
            <option>Himinbjorg</option>
          </Form.Control>
          <Form.Label>Post Title</Form.Label>
          <Form.Control name='title' type='text' placeholder='For Odin!' onChange={this.handleChange}/>
          <Form.Label>URL (optional)</Form.Label>
          <Form.Control name='url' placeholder='https://www.the-odin-project.com' onChange={this.handleChange}/>
          <Form.Label>Body (optional)</Form.Label>
          <Form.Control name='body' as="textarea" rows="5" placeholder='DAE love Odin?'/>
        </Form.Group>
        <Button variant='primary' type='submit'>Post</Button>
        </Form>
      </Modal.Body>
    </Modal>
    )
  }
}
