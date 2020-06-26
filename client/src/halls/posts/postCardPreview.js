import React from 'react'

export default class PostCardPreview extends React.Component {
  render() {
    return(
      <div className='url-preview'>
        <a href={this.props.data.url}><img className='post-card-img' src={this.props.data.image[0]}/></a>
      </div>
    )
  }
}
