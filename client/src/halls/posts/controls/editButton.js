import React from 'react'

export default class EditComment extends React.Component {
  render () {
    return(
      <div className='content-control'><button className='control-button' onClick={this.props.onClick}>Edit</button></div>
    )
  }
}
