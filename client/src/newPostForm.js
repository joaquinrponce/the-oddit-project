import React from 'react'
import { Redirect } from 'react-router-dom'
import { Modal, Form, Button } from 'react-bootstrap'

export default class NewPostForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      params: {
      hall: '',
      title: '',
      url: '',
      body: '',
      image: ''
      },
      redirect: false,
      postURL: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.submitPost = this.submitPost.bind(this)
    this.handleImage = this.handleImage.bind(this)
  }

  handleChange (e) {
    e.preventDefault()
    e.persist()
    const newState = JSON.parse(JSON.stringify(this.state))
    newState.params[e.target.name] = e.target.value
    this.setState(newState)
  }

  handleImage(e) {
    e.preventDefault()
    e.persist()
    console.log(e)
    const newState = JSON.parse(JSON.stringify(this.state))
    newState.params.image = e.target.files[0]
    this.setState(newState)
  }

  submitPost(params) {
    if (params.url) {
      let regex = new RegExp(/https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
      if (!params.url.match(regex)) {
      alert('URL invalid. Please submit a valid URL starting with "https://"')
      return
      }
    }
    let data = new FormData()
    data.append('title', params.title)
    data.append('user_id', this.props.userID)
    data.append('hall_id', params.hall.toLowerCase())
    data.append('body', params.body)
    data.append('url', params.url)
    data.append('image', params.image)
    fetch('/api/posts', {
      method: 'POST',
      body: data
      })
      .then(response => response.json())
      .then(response => {
            if (response.id) {
            const newState = JSON.parse(JSON.stringify(this.state))
            newState.params = {title: '', body: '', url: '', image: '', hall: ''}
            newState.redirect = true
            newState.postURL = `/posts/${response.id}`
            this.setState(newState, this.removeRedirect)
          } else {
            console.log(response)
            alert('Something wrong with post chief')
          }
    })
  }

  removeRedirect = () => {
    const newState = JSON.parse(JSON.stringify(this.state))
    newState.postURL = null
    newState.redirect = false
    this.setState(newState)
  }

  render() {
    if (this.state.redirect) {
      this.props.hideModal()
      return (
        <Redirect to={this.state.postURL}/>
      )
    }
    return(
    <Modal show={this.props.show} onHide={this.props.hideModal}>
      <Modal.Header closeButton>New Post</Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => {
          e.preventDefault()
          this.submitPost(this.state.params)
        }}>
        <Form.Group controlId='postForm'>
          <Form.Label>Hall</Form.Label>
          <Form.Control isInvalid={!this.state.params.hall} type='text' name='hall' onChange={this.handleChange}>
          </Form.Control>
          <Form.Label>Post Title</Form.Label>
          <Form.Control isInvalid={!this.state.params.title} name='title' type='text' onChange={this.handleChange}/>
          <Form.Label>URL</Form.Label>
          <Form.Control disabled={this.state.params.body || this.state.params.image} name='url' onChange={this.handleChange}/>
          <Form.Label>Image</Form.Label>
          <Form.File disabled={this.state.params.url} name='image' onChange={this.handleImage}/>
          <Form.Label>Body</Form.Label>
          <Form.Control disabled={this.state.params.url}name='body' as="textarea" rows="5" onChange={this.handleChange}/>
        </Form.Group>
        <Button variant='primary' type='submit'>Post</Button>
        </Form>
      </Modal.Body>
    </Modal>
    )
  }
}
