import React, { Component } from 'react'
import { connect } from 'react-redux'

// import axios from 'axios'
import Team from '../../components/Team/Team'
// import Modal from '../../components/UI/Modal/Modal'
import styles from './TradeEnvironment.css'
import * as actions from '../../store/actions/actions'


class TradeEnvironment extends Component {

  state = {
    showMenu: false,
    showModal: false
  }

  menuHandler = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  modalToggler = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  _addAssetToTrade = (asset, new_team, current_team) => {
    this.props.onAddAssetToTrade(asset, new_team, current_team)
  }

  _removeTradeAsset = (asset) => {
    this.props.onRemoveTradeAsset(asset)
  }

  _waivePlayer = (player, stretch) => {
    this.props.onWaivePlayer(player, stretch)
  }

  _stretchPlayer = (player) => {
    this.props.onStretchPlayer(player)
  }

  _renounceCapHold = (player) => {
    this.props.onRenounceCapHold(player)
  }

  render () {
    const tradeTeams = this.props.tradeTeams

    return (
      <div className={styles.TradeEnvironment}>
        {/* {this.state.showModal && <Modal>Chillin bitches.</Modal> } */}
        {tradeTeams.map((team)=> {
          return <Team
            key={team.id}
            team={team}
            addAssetToTrade={this._addAssetToTrade}
            removeTradeAsset={this._removeTradeAsset}
            waivePlayer={this._waivePlayer}
            stretchPlayer={this._stretchPlayer}
            seasonInfo={this.props.seasonInfo}
            renounceCapHold={this._renounceCapHold}
            showModal={this.state.showModal}
            modalToggler={this.modalToggler}
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
    onWaivePlayer: (player, stretch)=> dispatch(actions.waivePlayer(player, stretch)),
    onRenounceCapHold: (player)=> dispatch(actions.renounceCapHold(player))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeEnvironment)
