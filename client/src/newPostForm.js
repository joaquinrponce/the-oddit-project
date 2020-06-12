import React from 'react'
import { Redirect } from 'react-router-dom'
import { Modal, Form, Button, Alert } from 'react-bootstrap'

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
      postURL: null,
      imageInvalid: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.submitPost = this.submitPost.bind(this)
    this.handleImage = this.handleImage.bind(this)
    this.checkImageFileType = this.checkImageFileType.bind(this)
    this.getMimeType = this.getMimeType.bind(this)
    this.validateImage = this.validateImage.bind(this)
    this.imageRef = React.createRef()
  }

  handleChange (e) {
    e.preventDefault()
    e.persist()
    const newState = JSON.parse(JSON.stringify(this.state))
    newState.params[e.target.name] = e.target.value
    newState.params.image = this.state.params.image
    this.setState(newState)
  }

  handleImage(e) {
    e.preventDefault()
    const newState = JSON.parse(JSON.stringify(this.state))
    let image = e.target.files[0]
    if (!image) return
    this.checkImageFileType(image, this.getMimeType, this.validateImage, e.target)
  }

  checkImageFileType (image, getType, validate) {
    let filereader = new FileReader()
    filereader.onloadend = (evt) => {
            if (evt.target.readyState === FileReader.DONE) {
                const uint = new Uint8Array(evt.target.result)
                let bytes = []
                uint.forEach((byte) => {
                    bytes.push(byte.toString(16))
                })
                const hex = bytes.join('').toUpperCase()

                let mimeType = getType(hex)

                validate(mimeType, image)
            }
        }
    const blob = image.slice(0, 4);
    filereader.readAsArrayBuffer(blob);
  }

  validateImage(signature, image) {
    const newState = JSON.parse(JSON.stringify(this.state))
    if (signature) {
      newState.params.image = image
      newState.imageInvalid = false
      this.setState(newState)
    } else {
      newState.params.image = ''
      newState.imageInvalid = true
      this.imageRef.current.value = null
      this.setState(newState)
    }
  }

  getMimeType(signature) {
        switch (signature) {
            case '89504E47':
                return 'image/png'
            case '47494638':
                return 'image/gif'
            case 'FFD8FFDB':
            case 'FFD8FFE0':
                return 'image/jpeg'
            default:
                return false
        }
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
    console.log(this.state.params.image)
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
        <Form.Group controlId='hall'>
          <Form.Label>Hall</Form.Label>
          <Form.Control isInvalid={!this.state.params.hall} type='text' name='hall' onChange={this.handleChange}/>
          <Form.Text className='text-muted'>Must be an existing hall.</Form.Text>
        </Form.Group>
        <Form.Group controlId='title'>
          <Form.Label>Post Title</Form.Label>
          <Form.Control isInvalid={!this.state.params.title} name='title' type='text' onChange={this.handleChange}/>
          <Form.Text className='text-muted'>Make it something interesting, but don't make it "something interesting".</Form.Text>
        </Form.Group>
        <Form.Group controlId='url'>
          <Form.Label>URL</Form.Label>
          <Form.Control disabled={this.state.params.body || this.state.params.image} isInvalid={this.state.imageInvalid} name='url' onChange={this.handleChange}/>
          <Form.Text className='text-muted'>You can link to another site...</Form.Text>
        </Form.Group>
        <Form.Group controlId='image'>
          <Form.Label>Image</Form.Label>
          <Form.File ref={this.imageRef} disabled={this.state.params.url || this.state.params.body} value={this.state.image} name='image' onChange={this.handleImage}/>
          { this.state.imageInvalid && <Alert variant='danger' className='mt-2'> That file type is not accepted.</Alert>}
          <Form.Text className='text-muted'>... or add a picture...</Form.Text>
        </Form.Group>
        <Form.Group controlId='body'>
          <Form.Label>Body</Form.Label>
          <Form.Control disabled={this.state.params.url || this.state.params.image}name='body' as="textarea" rows="5" onChange={this.handleChange}/>
          <Form.Text className='text-muted'>... or write an essay.</Form.Text>
        </Form.Group>
        <Button variant='primary' type='submit'>Post</Button>
        </Form>
      </Modal.Body>
    </Modal>
    )
  }
}
