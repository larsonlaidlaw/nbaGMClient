import React, { Component } from 'react'
import { connect } from 'react-redux'
import Team from './Team/Team'
import axios from 'axios'
import styles from './TeamSelector.css'
import * as actions from '../../store/actions/actions'

const BASE_URL = process.env.REACT_APP_API

class TeamSelector extends Component {

  componentWillMount () {

    const url = `${BASE_URL}/teams/`

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
          tradeTeams={this.props.tradeTeams}
          initTradeTeamData={this.props.onInitTradeTeamData}
          hideTeam={this.props.onHideTeam}
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
    allTeams: state.reducer.allTeams,
    tradeTeams: state.reducer.tradeTeams
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadTeams: (teams)=> dispatch(actions.loadTeams(teams)),
    onInitTradeTeamData: (team)=> dispatch(actions.initTeamTradeData(team)),
    onHideTeam: (team)=> dispatch(actions.hideTeam(team))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSelector)
