import React, { Component } from 'react'
import { connect } from 'react-redux'

import CircleImage from './CircleImage/CircleImage'
import TradeMenu from './TradeMenu/TradeMenu'
import * as actions from '../../../../../store/actions/actions'


import styles from './Player.css'

class Player extends Component {
  state = {
    showHover: false
  }

  menuHandler = (event) => {
    event.stopPropagation()
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  _addPlayerToTrade = (player, team) => {
    this.props.onAddPlayerToTrade(player, team)
  }

  _removeTradeAsset = (asset) => {
    this.props.onRemoveTradeAsset(asset)
  }

  render (){

    return (
      <div>
        <div className = {styles.HoverContainer} onMouseDown={(event)=> this.menuHandler(event)} >
          {this.state.showMenu && <TradeMenu
            addPlayerToTrade={this._addPlayerToTrade}
            team={this.props.team}
            player={this.props.player}
            tradeTeams={this.props.tradeTeamData}
            menuClose={this.menuHandler}
            whichMenu={this.props.whichMenu}
            removeTradeAsset={this._removeTradeAsset}
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
          {this.props.player.currentTarget ? <div className={styles.CurrentTarget}> Being Traded to the {this.props.player.currentTarget}</div> : null}
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
    onAddPlayerToTrade: (player, team)=> dispatch(actions.addPlayerToTrade(player, team)),
    onRemoveTradeAsset: (asset)=> dispatch(actions.removeTradeAsset(asset))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Player)
