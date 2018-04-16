import React, { Component } from 'react'
import { connect } from 'react-redux'

// import axios from 'axios'
import Team from '../../components/Team/Team'
// import Modal from '../../components/UI/Modal/Modal'
import styles from './TradeEnvironment.css'
import * as actions from '../../store/actions/actions'


class TradeEnvironment extends Component {

  state = {
    showModal: false,
    modalTeamID: null,
    modalTarget: null
  }

  modalToggler = (player, team) => {
    console.log('we in here')
    if (team) {
      console.log(team.id)
    }

    this.setState({
      showModal: !this.state.showModal,
      modalTeamID: team ? team.id : null,
      modalTarget: this.state.modalTarget ? null : player
    })
  }

  selectModalTarget = (player) => {
    console.log('from select target function, selected player', player)
    this.setState({
      modalTarget: player
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

  _optOutPlayerContract = (player) => {
    this.props.onOptOutPlayerContract(player)
  }
  _optInPlayerContract = (player) => {
    this.props.onOptInPlayerContract(player)
  }
  _pickUpTeamOption = (player) => {
    this.props.onPickUpTeamOption(player)
  }
  _declineTeamOption = (player) => {
    this.props.onDeclineTeamOption(player)
  }
  _createNewContract = (player, team) => {
    this.props.onCreateNewContract(player, team)
  }

  _addTradeTeamFromFreeAgent = (freeAgent, team) => {
    this.props.onAddTradeTeamFromFreeAgent(freeAgent, team)
  }

  render () {
    const tradeTeams = this.props.tradeTeams

    let renderTradeTeams = (
      <div className={styles.noTradeTeams}>Click on a team to start.</div>
    )

    if (tradeTeams.length > 0) {
      renderTradeTeams = (
        tradeTeams.map((team)=> {
          return (!team.hide && <Team
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
            modalTeamID={this.state.modalTeamID}
            modalTarget={this.state.modalTarget}
            selectModalTarget={this.selectModalTarget}
            seasonInfo={this.props.seasonInfo}
            optOutPlayerContract={this._optOutPlayerContract}
            optInPlayerContract={this._optInPlayerContract}
            pickUpTeamOption={this._pickUpTeamOption}
            declineTeamOption={this._declineTeamOption}
            createNewContract={this._createNewContract}
            tradeTeams={this.props.tradeTeams}
            addTradeTeamFromFreeAgent={this._addTradeTeamFromFreeAgent}
          />)
        })
      )
    }

    return (
      <div className={styles.TradeEnvironment}>
        {renderTradeTeams}
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
    onRenounceCapHold: (player)=> dispatch(actions.renounceCapHold(player)),
    onOptOutPlayerContract: (player)=> dispatch(actions.optOutPlayerContract(player)),
    onOptInPlayerContract: (player)=> dispatch(actions.optInPlayerContract(player)),
    onPickUpTeamOption: (player)=> dispatch(actions.pickUpTeamOption(player)),
    onDeclineTeamOption: (player)=> dispatch(actions.declineTeamOption(player)),
    onCreateNewContract: (player, team)=> dispatch(actions.createNewContract(player, team)),
    onAddTradeTeamFromFreeAgent: (freeAgent, team)=> dispatch(actions.addTradeTeamFromFreeAgent(freeAgent, team))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeEnvironment)
