import React, { Component } from 'react'
import axios from 'axios'

class PlayerEdit extends Component {

  componentDidMount () {
    axios.get('http://localhost:3000/players.json', this.props.match.url)
    .then( res => {
      console.log(res.data);
    })
    console.log(this.props.match.url);
  }

  render () {
    return (
      <div>PlayerEdit</div>
    )
  }
}

export default PlayerEdit
