import React from 'react'
import {Form, Button} from 'react-bootstrap'
import { userContext } from '../../../userContext.js'

export default class RemoveModeratorForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = { value: undefined, selectOptions: [] }
  }

  componentDidMount = () => {
    const options = []
    const filtered_mods = this.props.moderationships.filter(mod => {return mod.name !== this.context.user.name})
    filtered_mods.forEach(mod => {
      options.push(<option key={mod.id} value={mod.id}>{mod.name}</option>)
    })
    if (filtered_mods.length > 1 ) {
    this.setState({value: filtered_mods[0].id, selectOptions: options})
    }
  }

  handleChange = (e) => {
    this.setState({value: e.target.value, selectOptions: this.state.selectOptions})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`/api/moderationships/${this.state.value}`,{
      method: 'DELETE',
      headers: { 'content-type': 'application/json',
                 'Authorization': 'Bearer ' + this.context.user.token}
    })
    .then(response => {
      if (response.ok) {
        window.location.reload()
        return
      } else {
        console.log(response)
        this.props.hideModal()
        return
      }
    })
    .catch(error => console.log(error))
  }

  render() {
    return(
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control defaultValue={this.state.value} onChange={this.handleChange} as='select' name='modId'>
            { this.state.selectOptions }
          </Form.Control>
          <Form.Text className='text-muted'>Select the moderator you wish to remove.</Form.Text>
        </Form.Group>
        <Button type='submit'>Remove</Button>
      </Form>
    )
  }
}

RemoveModeratorForm.contextType = userContext
