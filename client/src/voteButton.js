import React from 'react'

export default class VoteButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {active: false}
  }

  componentDidMount() {

  }

  handleClick = (e) => {
    console.log('Yippee!')
    this.props.handleVote(this.props.value)
  }

  render () {
    const symbol = this.props.value === 1 ? '▲' : '▼'
    return (
      <div onClick={this.handleClick}>{symbol}</div>
    )
  }
}
