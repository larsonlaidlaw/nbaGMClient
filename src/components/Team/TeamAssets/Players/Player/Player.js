import React, { Component } from 'react'
import { connect } from 'react-redux'

import CircleImage from './CircleImage/CircleImage'
import Hover from '../../../../UI/Hover/Hover'
import * as actions from '../../../../../store/actions/teamSelector'


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

  _addPlayerToTrade = (player, team) => {
    this.props.onAddPlayerToTrade(player, team)
  }

  render (){

    let hover = false
    if (this.state.showHover) {
      hover = true;
    }

    return (
      <div className = {styles.HoverContainer} onMouseDown={this.hoverHandler} >
        {hover && this.props.currentPlayer && <Hover
          addPlayerToTrade={this._addPlayerToTrade}
          team={this.props.team}
          player={this.props.player}
          tradeTeams={this.props.tradeTeamData}
        />}
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

const mapStateToProps = state => {
  return {
    tradeTeamData: state.teamSelector.tradeTeamData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlayerToTrade: (player, team)=> dispatch(actions.addPlayerToTrade(player, team))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Player)
