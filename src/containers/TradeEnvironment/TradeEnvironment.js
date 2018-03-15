import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from 'axios'
import Team from '../../components/Team/Team'
import styles from './TradeEnvironment.css'

class TradeEnvironment extends Component {

  render () {
    const tradeTeams = this.props.tradeTeamData

    return (
      <div className={styles.TradeEnvironment}>
        {tradeTeams.map((teamData)=> <Team key={teamData.id} team={teamData} />)}
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

export default connect(mapStateToProps)(TradeEnvironment)
