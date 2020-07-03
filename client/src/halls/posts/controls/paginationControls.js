import React from 'react'

export default class PaginationControls extends React.Component {
  render() {
    return(
      <div className='pagination-controls'>
      { this.props.page !== 1 && <button onClick={() => this.props.onClick(-1)} className='pagination-button'>{"⬅ back"}</button> }
      { !this.props.lastPage && <button onClick={() => this.props.onClick(1)} className='pagination-button'>{"next ➡"}</button> }
      </div>
    )
  }
}
