import React, { Component } from 'react'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API


class PlayerEdit extends Component {

  componentDidMount () {
    axios.get(`${BASE_URL}/players.json`, this.props.match.url)
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
