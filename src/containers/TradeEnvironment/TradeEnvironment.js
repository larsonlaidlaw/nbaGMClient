import React, { Component } from 'react'
import { connect } from 'react-redux'

// import axios from 'axios'
import Team from '../../components/Team/Team'
import styles from './TradeEnvironment.css'
import * as actions from '../../store/actions/actions'


class TradeEnvironment extends Component {

  state = {
    showMenu: false
  }

  menuHandler = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  _addAssetToTrade = (asset, new_team, current_team) => {
    this.props.onAddAssetToTrade(asset, new_team, current_team)
  }

  _removeTradeAsset = (asset) => {
    this.props.onRemoveTradeAsset(asset)
  }

  _waivePlayer = (player) => {
    console.log('hitting _');
    this.props.onWaivePlayer(player)
  }

  render () {
    const tradeTeams = this.props.tradeTeams

    return (
      <div className={styles.TradeEnvironment}>
        {tradeTeams.map((team)=> {
          return <Team
            key={team.id}
            team={team}
            addAssetToTrade={this._addAssetToTrade}
            removeTradeAsset={this._removeTradeAsset}
            waivePlayer={this._waivePlayer}
            seasonInfo={this.props.seasonInfo}
          />
          })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tradeTeams: state.reducer.tradeTeams,
    seasonInfo: state.reducer.seasonInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddAssetToTrade: (asset, new_team, current_team)=> dispatch(actions.addAssetToTrade(asset, new_team, current_team)),
    onRemoveTradeAsset: (asset)=> dispatch(actions.removeTradeAsset(asset)),
    onWaivePlayer: (player)=> dispatch(actions.stretchPlayer(player))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeEnvironment)
