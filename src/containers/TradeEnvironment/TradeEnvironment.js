import React, { Component } from 'react'
import { connect } from 'react-redux'

// import axios from 'axios'
import Team from '../../components/Team/Team'
import styles from './TradeEnvironment.css'


class TradeEnvironment extends Component {

  render () {
    const tradeTeams = this.props.tradeTeamData

    return (
      <div className={styles.TradeEnvironment}>
        {tradeTeams.map((team)=> {
          return <Team
            key={team.id}
            team={team}
            // tradeTeamData={this.props.tradeTeamData}
          />
          })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tradeTeamData: state.teamSelector.tradeTeamData
  }
}


export default connect(mapStateToProps)(TradeEnvironment)
