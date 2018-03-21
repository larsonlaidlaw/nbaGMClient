import React, { Component } from 'react'
import { connect } from 'react-redux'

import CircleImage from './CircleImage/CircleImage'
import TradeMenu from './TradeMenu/TradeMenu'
import * as actions from '../../../../../store/actions/actions'


import styles from './Player.css'

class Player extends Component {
  state = {
    showHover: false
  }

  menuHandler = (event) => {
    event.stopPropagation()
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  calculateAge = (dateString) => {
    var birthDate = new Date(dateString);
    var ageDifMs = Date.now() - birthDate.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  formatSalary = (player) => {
    let salary = "Free Agent"
    if (player.contracts[0]) {
      salary = "$X,XXX,XXX"
      const season = player.contracts[0].seasons[0]
      if (season) {
          salary = player.contracts[0].seasons[0].salary
          salary = salary.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')
          salary = '$' + salary
      }
      return salary
    }
    return salary
  }

  calcYearsRemaining = (player) => {
    let x = "Free Agent"
    if (player.contracts[0]) {
      const contract = player.contracts[0]
      const remainingYears = contract.seasons.length - 1
      if (remainingYears > 1) {
        x = `${remainingYears} years left`
      }
      if (remainingYears === 1) {
        x = 'Expiring Contract'
      }
    }
    return x
  }

  findOption = (player) => {
    if (player.contracts[0]) {
      let optionType = "No Options"
      const season = player.contracts[0].seasons[0]

      if (season) {
        if (season.player_option) {
          optionType = "Player Option"
        }

        if (season.team_option) {
          optionType = "Team Option"
        }
      }
      return optionType
    }
  }

  render (){

    return (
      <div>
        <div className = {styles.HoverContainer} onMouseDown={(event)=> this.menuHandler(event)} >
          {this.state.showMenu && <TradeMenu
            player={this.props.player}
            menuClose={this.menuHandler}
            whichMenu={this.props.whichMenu}
            {...this.props}
          />}
          <div className={styles.Player}>
              <CircleImage fileName={this.props.player.slug} />
              <div className={styles.PlayerInfo}>
                <div><span>{this.props.player.name}</span></div>
                <div><span>{`${this.calculateAge(this.props.player.birth_date)} years old`}</span></div>
              </div>
              <div className={styles.SalaryInfo}>
                <div><span>{this.formatSalary(this.props.player)}</span></div>
                <div><span>{this.calcYearsRemaining(this.props.player)}</span></div>
                <div><span>{this.findOption(this.props.player)}</span></div>
              </div>
          </div>

          {this.props.player.currentTarget ? <div className={styles.CurrentTarget}> Being Traded to the {this.props.player.currentTarget}</div> : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tradeTeams: state.teamSelector.tradeTeams
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onAddPlayerToTrade: (player, team)=> dispatch(actions.addPlayerToTrade(player, team)),
//     onAddAssetToTrade: (asset, new_team, current_team)=> dispatch(actions.addAssetToTrade(asset, new_team, current_team)),
//     onRemoveTradeAsset: (asset)=> dispatch(actions.removeTradeAsset(asset))
//   }
// }


export default connect(mapStateToProps)(Player)
