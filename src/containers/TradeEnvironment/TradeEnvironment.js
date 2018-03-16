import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from 'axios'
import Team from '../../components/Team/Team'
import styles from './TradeEnvironment.css'
import * as actions from '../../store/actions/playerSelector'


class TradeEnvironment extends Component {

  render () {
    const tradeTeams = this.props.tradeTeamData

    return (
      <div className={styles.TradeEnvironment}>
        {tradeTeams.map((teamData)=> {
          return <Team
            key={teamData.id}
            team={teamData}
            addPlayerToTrade={this.props.onAddPlayerToTrade}
          />
          })}
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    tradeTeams: state.teamSelector.tradeTeams,
    tradeTeamData: state.teamSelector.tradeTeamData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlayerToTrade: (player)=> dispatch(actions.addPlayerToTrade(player))
  }
}

export default connect(mapStateToProps)(TradeEnvironment)
