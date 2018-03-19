import React, { Component } from 'react'
import styles from './DraftPickTeamLogo.css'
import { connect } from 'react-redux'

import DraftPickMenu from '../DraftPick/DraftPickMenu/DraftPickMenu'


import * as actions from '../../../../../store/actions/teamSelector'

class DraftPickTeamLogo extends Component  {

  state = {
    showMenu: false
  }

  menuHandler = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  _addDraftPickToTrade = (draftpick, team, original_team) => {
    this.props.onAddDraftPickToTrade(draftpick, team, original_team)
  }

  render () {

    console.log(this.props.round);

    const classes = [styles.DraftPickTeamLogo]
    if (this.props.round === 1) {
      classes.push(styles.FirstRoundPick)
    }

    if (this.props.round === 2) {
      classes.push(styles.SecondRoundPick)
    }

    const imagePath = require('../../../../../assets/images/teams/' + this.props.logo.toString() + '.png')
    return (

      <div className={styles.MenuContainer} onMouseDown={this.menuHandler}>
        {this.state.showMenu && <DraftPickMenu
          team={this.props.team}
          original_team={this.props.original_team}
          pick={this.props.pick}
          round={this.props.round}
          year={this.props.year}
          addDraftPickToTrade={this._addDraftPickToTrade}
          tradeTeams={this.props.tradeTeamData}
          menuClose={this.menuHandler}
        />}
        <div className={classes.join(' ')}>
          <img src={imagePath} alt="player-name" />
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
    onAddDraftPickToTrade: (draftpick, team, original_team)=> dispatch(actions.addDraftPickToTrade(draftpick, team, original_team))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DraftPickTeamLogo)
