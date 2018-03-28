import React, { Component } from 'react'
import { connect } from 'react-redux'
import DraftPickMenu from './DraftPickMenu/DraftPickMenu'
// import * as actions from '../../../../../store/actions/actions'
import styles from './DraftPick.css'

class DraftPick extends Component {

  state = {
    showMenu: false
  }

  menuHandler = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  render (){

    const classes = [styles.DraftPick]

    if (this.props.team) {
      if (this.props.team.nickname === 'hawks') {
        classes.push(styles.Hawks)
      }

      if (this.props.team.nickname === 'celtics') {
        classes.push(styles.Celtics)
      }

      if (this.props.team.nickname === 'nets') {
        classes.push(styles.Nets)
      }

      if (this.props.team.nickname === 'hornets') {
        classes.push(styles.Hornets)
      }

      if (this.props.team.nickname === 'bulls') {
        classes.push(styles.Bulls)
      }

      if (this.props.team.nickname === 'cavaliers') {
        classes.push(styles.Cavaliers)
      }

      if (this.props.team.nickname === 'mavericks') {
        classes.push(styles.Mavericks)
      }

      if (this.props.team.nickname === 'nuggets') {
        classes.push(styles.Nuggets)
      }

      if (this.props.team.nickname === 'pistons') {
        classes.push(styles.Pistons)
      }

      if (this.props.team.nickname === 'warriors') {
        classes.push(styles.Warriors)
      }

      if (this.props.team.nickname === 'rockets') {
        classes.push(styles.Rockets)
      }

      if (this.props.team.nickname === 'pacers') {
        classes.push(styles.Pacers)
      }

      if (this.props.team.nickname === 'clippers') {
        classes.push(styles.Clippers)
      }

      if (this.props.team.nickname === 'lakers') {
        classes.push(styles.Lakers)
      }

      if (this.props.team.nickname === 'grizzlies') {
        classes.push(styles.Grizzlies)
      }

      if (this.props.team.nickname === 'heat') {
        classes.push(styles.Heat)
      }

      if (this.props.team.nickname === 'bucks') {
        classes.push(styles.Bucks)
      }

      if (this.props.team.nickname === 'timberwolves') {
        classes.push(styles.Timberwolves)
      }

      if (this.props.team.nickname === 'pelicans') {
        classes.push(styles.Pelicans)
      }

      if (this.props.team.nickname === 'knicks') {
        classes.push(styles.Knicks)
      }

      if (this.props.team.nickname === 'thunder') {
        classes.push(styles.Thunder)
      }

      if (this.props.team.nickname === 'magic') {
        classes.push(styles.Magic)
      }

      if (this.props.team.nickname === '76ers') {
        classes.push(styles.Sixers)
      }

      if (this.props.team.nickname === 'suns') {
        classes.push(styles.Suns)
      }

      if (this.props.team.nickname === 'blazers') {
        classes.push(styles.Blazers)
      }

      if (this.props.team.nickname === 'kings') {
        classes.push(styles.Kings)
      }

      if (this.props.team.nickname === 'spurs') {
        classes.push(styles.Spurs)
      }

      if (this.props.team.nickname === 'raptors') {
        classes.push(styles.Raptors)
      }

      if (this.props.team.nickname === 'jazz') {
        classes.push(styles.Jazz)
      }

      if (this.props.team.nickname === 'wizards') {
        classes.push(styles.Wizards)
      }

      if (this.props.pick.currentTarget) {
        classes.push(styles.Ineligible)
      }
    }


    let year = this.props.pick.year.toString().substring(2)
    year = "'" + year

    return (
      <div className={styles.MenuContainer} onMouseDown={this.menuHandler}>
        {this.state.showMenu && <DraftPickMenu
          pick={this.props.pick}
          menuClose={this.menuHandler}
          whichMenu={this.props.whichMenu}
          {...this.props}
        />}
        <div className={classes.join(' ')} onMouseDown={this.menuHandler}>{year} {this.props.pick.round === 1 ? "1st" : "2nd"}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tradeTeams: state.reducer.tradeTeams
  }
}

export default connect(mapStateToProps)(DraftPick)
