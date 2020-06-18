import React from 'react'
import { Redirect } from 'react-router-dom'
import { Modal, Form, Button, Alert } from 'react-bootstrap'

export default class PostForm extends React.Component {
  constructor (props) {
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
      errors: {
        hall: false,
        title: false,
        url: false,
        body: false
      },
      formInvalid: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.submitPost = this.submitPost.bind(this)
    this.handleImage = this.handleImage.bind(this)
    this.checkImageFileType = this.checkImageFileType.bind(this)
    this.getMimeType = this.getMimeType.bind(this)
    this.validateImage = this.validateImage.bind(this)
    this.validateFields = this.validateFields.bind(this)
    this.resetState = this.resetState.bind(this)
    this.imageRef = React.createRef()
  }

  handleChange (e) {
    e.preventDefault()
    const newState = JSON.parse(JSON.stringify(this.state))
    newState.params[e.target.name] = e.target.value
    newState.params.image = this.state.params.image
    this.setState(newState, this.validateFields)
  }

  validateFields () {
    const newState = JSON.parse(JSON.stringify(this.state))
    newState.params.image = this.state.params.image
    const params = newState.params
    newState.errors = { hall: false, title: false, url: false, body: false }
    newState.formInvalid = false
    if (!params.hall) {
      newState.errors.hall = true
      newState.formInvalid = true
    }
    if (!params.title || params.title.length > 100) {
      newState.errors.title = true
      newState.formInvalid = true
    }
    if (params.url) {
      const regex = new RegExp(/https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
      if (!params.url.match(regex)) {
        newState.errors.url = true
        newState.formInvalid = true
      }
    }
    if (params.body && params.body.length > 1000) {
      newState.errors.body = true
      newState.formInvalid = true
    }
    this.setState(newState)
  }

  handleImage (e) {
    e.preventDefault()
    const image = e.target.files[0]
    if (!image) return
    this.checkImageFileType(image, this.getMimeType, this.validateImage, e.target)
  }

  checkImageFileType (image, getType, validate) {
    const filereader = new FileReader()
    filereader.onloadend = (evt) => {
      if (evt.target.readyState === FileReader.DONE) {
        const uint = new Uint8Array(evt.target.result)
        const bytes = []
        uint.forEach((byte) => {
          bytes.push(byte.toString(16))
        })
        const hex = bytes.join('').toUpperCase()

        const mimeType = getType(hex)

        validate(mimeType, image)
      }
    }
    const blob = image.slice(0, 4)
    filereader.readAsArrayBuffer(blob)
  }

  validateImage (signature, image) {
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

  getMimeType (signature) {
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

  submitPost (params) {
    if (this.props.tokenIsExpired(this.props.user.token)) {
      alert('Your session has expired. You will be redirected to the homepage. Please login again.')
      this.setState({redirect: true, redirectURL: "/"}, window.location.reload(true))
      return
    }
    const data = new FormData()
    data.append('title', params.title)
    data.append('user_id', this.props.user.id)
    data.append('hall_id', params.hall.toLowerCase())
    data.append('body', params.body)
    data.append('url', params.url)
    data.append('image', params.image)
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      },
      body: data
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          alert('Something went wrong')
        }
      })
      .then(response => {
        if (response.id) {
          const newState = JSON.parse(JSON.stringify(this.state))
          newState.params = { title: '', body: '', url: '', image: '', hall: '' }
          newState.redirect = true
          newState.redirectURL = `/posts/${response.id}`
          this.props.hideModal()
          this.setState(newState, this.resetState)
        } else {
          alert('Something wrong with post chief')
        }
      }).catch(error => {
        alert('There was an error. Please contact the site admin.')
        console.log(error)
      })
  }

  resetState () {
    this.setState({
      params: {
        hall: '',
        title: '',
        url: '',
        body: '',
        image: ''
      },
      redirect: false,
      postURL: null,
      errors: {
        hall: false,
        title: false,
        url: false,
        body: false
      },
      formInvalid: true
    })
  }

  render () {
    if (this.state.redirect) {
      return (
        <Redirect to={this.state.redirectURL}/>
      )
    }
    return (
      <Modal show={this.props.show} onHide={this.props.hideModal}>
        <Modal.Header closeButton>New Post</Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => {
            e.preventDefault()
            this.submitPost(this.state.params)
          }}>
            <Form.Group controlId='hall'>
              <Form.Label>Hall</Form.Label>
              <Form.Control isInvalid={this.state.errors.hall} type='text' name='hall' onChange={this.handleChange}/>
              <Form.Text className='text-muted'>Required. Must be an existing hall.</Form.Text>
            </Form.Group>
            <Form.Group controlId='title'>
              <Form.Label>Post Title</Form.Label>
              <Form.Control isInvalid={this.state.errors.title} name='title' type='text' onChange={this.handleChange}/>
              <Form.Text className='text-muted'>Required. Make it something interesting, but don&apos;t make it `&quot;something interesting`&quot;.</Form.Text>
            </Form.Group>
            <Form.Group controlId='url'>
              <Form.Label>URL</Form.Label>
              <Form.Control isInvalid={this.state.errors.url} disabled={this.state.params.body || this.state.params.image} name='url' onChange={this.handleChange}/>
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
              <Form.Control isInvalid={this.state.errors.body} disabled={this.state.params.url || this.state.params.image}name='body' as="textarea" rows="5" onChange={this.handleChange}/>
              <Form.Text className='text-muted'>... or write an essay.</Form.Text>
            </Form.Group>
            <Button disabled={this.state.formInvalid} variant='primary' type='submit'>Post</Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}
