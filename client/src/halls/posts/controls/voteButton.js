import React from 'react'

export default class VoteButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {active: false}
  }

  componentDidMount() {

  }

  handleClick = (e) => {
    this.props.handleVote(this.props.value)
  }

  render () {
    const symbol = this.props.value === 1 ? '▲' : '▼'
    let className = this.props.value === 1 ? 'upvote' : 'downvote'
    className += this.props.active ? ' active' : ''
    return (
      <div className={className} onClick={this.handleClick}>{symbol}</div>
    )
  }
}
