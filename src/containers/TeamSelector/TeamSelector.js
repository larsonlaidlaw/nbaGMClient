import React, { Component } from 'react'
import { connect } from 'react-redux'
import Team from './Team/Team'
import axios from 'axios'
import styles from './TeamSelector.css'
import * as actions from '../../store/actions/actions'


class TeamSelector extends Component {

  componentWillMount () {

    const url = 'http://localhost:3000/teams/'

    axios.get(url)
    .then( (response) => {
      let teamArray = []
      response.data.forEach(team => {
        teamArray.push(team)
      })

      this.props.onLoadTeams(teamArray)
    })
    .catch( (error) => {
      console.log(error);
    })
  }

  render () {

    let teamList = "Loading"

    if (this.props.allTeams) {
      teamList = this.props.allTeams.map( (team)=> {
        return <Team
          key={team.id}
          team={team}
          initTradeTeamData={this.props.onInitTradeTeamData}
         />
      })
    }

    return (
      <div className={styles.TeamSelectorContainer}>
        <div className={styles.TeamSelector}>
          {teamList}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allTeams: state.teamSelector.allTeams,
    tradeTeamData: state.teamSelector.tradeTeamData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadTeams: (teams)=> dispatch(actions.loadTeams(teams)),
    onInitTradeTeamData: (team)=> dispatch(actions.initTeamTradeData(team)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSelector)
