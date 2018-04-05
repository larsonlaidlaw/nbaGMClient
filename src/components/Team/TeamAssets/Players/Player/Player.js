import React, { Component } from 'react'
import { connect } from 'react-redux'
import CircleImage from './CircleImage/CircleImage'
import TradeMenu from './TradeMenu/TradeMenu'


import styles from './Player.css'

class Player extends Component {
  state = {
    showMenu: false,
  }

  menuToggler = (event) => {
    // console.log('hit the menuHandler');
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
      const remainingYears = contract.seasons.length
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
    let optionType = "No Options"
    const seasons = player.contracts[0].seasons
    if (seasons.length > 0) {
      seasons.forEach(season => {
        if (season.player_option) {
          optionType = "Player Option"
        }
      })
      seasons.forEach(season => {
        if (season.team_option) {
          optionType = "Team Option"
        }
      })
    }
    return optionType
  }

  render (){

    let classes = [styles.Player]

    // if (this.props.player.contracts[0].seasons[0].player_option) {
    //   classes.push = styles.PlayerOption
    // }

    return (
      <div>
        <div
          className={styles.MenuContainer}
          onClick={this.menuToggler}>
          {this.state.showMenu &&
            <TradeMenu
              onMouseDown={this.props.menuToggler}
              player={this.props.player}
              menuToggler={this.menuToggler}
              menuType={this.props.menuType}
              {...this.props}
            />}
          <div className={classes.join(' ')} >
              <CircleImage fileName={this.props.player.slug} />
              <div className={styles.PlayerInfo}>
                <div><span>{this.props.player.name}</span></div>
                <div><span>{`${this.calculateAge(this.props.player.birth_date)} years old`}</span></div>
              </div>
              {!this.props.player.contracts[0].two_way &&
                <div className={styles.SalaryInfo}>
                  <div><span>{this.formatSalary(this.props.player)}</span></div>
                  <div><span>{this.calcYearsRemaining(this.props.player)}</span></div>
                  <div><span>{this.findOption(this.props.player)}</span></div>
                </div>
              }
              {this.props.player.contracts[0].two_way &&
                <div className={styles.SalaryInfo}>
                  <div><span>Two way player</span></div>
                </div>
              }
              {this.props.player.currentTarget ? <div className={styles.CurrentTarget}> Being Traded to the {this.props.player.currentTarget}</div> : null}
          </div>
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

export default connect(mapStateToProps)(Player)
