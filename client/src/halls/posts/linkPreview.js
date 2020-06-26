import React from 'react'
import { ReactTinyLink } from 'react-tiny-link'

export default class LinkPreview extends React.Component {

  constructor(props) {
    super(props)
    this.state = { data: null}
  }

  setData = (data) => {
    this.setState({data: data})
  }

  render() {
    return(
      <div className='url-preview'>
        <div className='tiny-link-card'>
        <ReactTinyLink url={this.props.url} onSuccess={(data) => this.setData(data)}/>
        </div>
        { this.state.data && <a href={this.state.data.url}><img alt='url-preview' className='post-card-img' src={this.state.data.image[0]}/></a> }
      </div>
    )
  }
}
