import React from 'react'
import {Form, Button} from 'react-bootstrap'

export default class EditSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {body: ''}
  }

  handleChange = (e) => {
    this.setState({body: e.target.value})
  }
  render() {
    return(
      <>
      <h4>Edit Sidebar</h4>
      <Form onSubmit={(e) => {
        e.preventDefault()
        this.props.handleSubmit(this.state.body)
      }}>
        <Form.Group>
          <Form.Control as='textarea' rows='10' value={this.state.body || this.props.body} onChange={this.handleChange}/>
        </Form.Group>
        <Button type='submit'> Submit </Button>
      </Form>
      </>
    )
  }
}
