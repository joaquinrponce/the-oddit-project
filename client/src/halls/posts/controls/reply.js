import React from 'react'

export default class Reply extends React.Component {
  render () {
    return(
      <div className='content-control'><button className='control-button' onClick={this.props.onClick}>Reply</button></div>
    )
  }
}
