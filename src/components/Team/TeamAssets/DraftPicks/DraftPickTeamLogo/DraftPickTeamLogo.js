import React, { Component } from 'react'
import styles from './DraftPickTeamLogo.css'
import { connect } from 'react-redux'

import DraftPickMenu from '../DraftPick/DraftPickMenu/DraftPickMenu'


import * as actions from '../../../../../store/actions/actions'

class DraftPickTeamLogo extends Component  {

  state = {
    showMenu: false
  }

  menuHandler = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  render () {

    const classes = [styles.DraftPickTeamLogo]
    if (this.props.pick.round === 1) {
      classes.push(styles.FirstRoundPick)
    }

    if (this.props.pick.round === 2) {
      classes.push(styles.SecondRoundPick)
    }

    if (this.props.pick.currentTarget) {
      classes.push(styles.Ineligible)
    }

    const imagePath = require('../../../../../assets/images/teams/' + this.props.pick.original_team.toString() + '.png')
    return (

      <div className={styles.MenuContainer} onMouseDown={this.menuHandler}>
        {this.state.showMenu && <DraftPickMenu
          pick={this.props.pick}
          menuClose={this.menuHandler}
          whichMenu={this.props.whichMenu}
          {...this.props}
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
    tradeTeams: state.reducer.tradeTeams
  }
}


export default connect(mapStateToProps)(DraftPickTeamLogo)
