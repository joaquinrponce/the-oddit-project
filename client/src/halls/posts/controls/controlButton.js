import React from 'react'

export default class ControlButton extends React.Component {
  render () {
    return(
      <div className='content-control'><button className='control-button' onClick={this.props.onClick}>{this.props.text}</button></div>
    )
  }
}
