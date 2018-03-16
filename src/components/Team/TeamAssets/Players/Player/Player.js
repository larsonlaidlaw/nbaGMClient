import React, { Component } from 'react'
import CircleImage from './CircleImage/CircleImage'
import Hover from '../../../../UI/Hover/Hover'

import styles from './Player.css'

class Player extends Component {
  state = {
    showHover: false
  }

  hoverHandler = () => {
    this.setState({
      showHover: !this.state.showHover
    })
  }

  render (){

    let hover = null
    if (this.state.showHover) {
      hover = <Hover onAddPlayerToTrade={this.props.onAddPlayerToTrade}/>
    }
    return (
      <div className = {styles.HoverContainer} onMouseDown={this.hoverHandler} >
        {hover}
      <div className={styles.Player}>
        <CircleImage fileName={this.props.fileName} />
        <div className={styles.PlayerInfo}>
          <div><span>{this.props.name}</span></div>
          <div><span>{`${this.props.age} years old`}</span></div>
        </div>
        <div className={styles.SalaryInfo}>
          <div><span>{this.props.salary}</span></div>
          <div><span>{this.props.years_left}</span></div>
          <div><span>{this.props.option}</span></div>
        </div>
      </div>
    </div>
    )
  }
}


export default Player
