import React, { Fragment, Component } from 'react'

import * as helpers from '../../../helpers/helpers'
import styles from './NewContract.css'

class NewContract extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contractLength: 1,
      playerOption: false,
      teamOption: false,
      startingSalary: this.maxStartingSalary(this.props.player, this.props.seasonInfo),
      raises: .08
    }
  }

  contractLengthHandler = (event) => {
    this.setState({
      contractLength: parseInt(event.target.value),
    })
  }

  startingSalaryHandler = (startingSalary, raises) => {
    const salary = []
    let raise = startingSalary * parseFloat(raises)

    for (var i = 0; i < this.state.contractLength; i++) {
      salary.push(startingSalary)
      startingSalary = Math.round(startingSalary + raise)
    }
    return salary
  }

  salaryUpdateHandler = (event) => {
    this.setState({
      startingSalary: parseInt(event.target.value)
    })
  }

  raisesHandler = (event) => {
    this.setState({
      raises: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
  }

  setMaxSalary = () => {
    this.setState({
      startingSalary: this.maxStartingSalary(this.props.player, this.props.seasonInfo)
    })
  }

  setMinSalary = () => {
    this.setState({
      startingSalary : this.minimumStartingSalary(this.props.player)
    })
  }

  maxStartingSalary = (player, seasonInfo) => {
    let startingSalary = 0
    let salaryCap = seasonInfo.salaryCap

    if (player.experience <= 6) {
      startingSalary = .25 * salaryCap
    }
    if (player.experience >= 7 && player.experience <= 9) {
      startingSalary = .3 * salaryCap
    }
    if (player.experience >= 10) {
      startingSalary = .35 * salaryCap
    }
    return Math.round(startingSalary)
  }

  minimumStartingSalary = (player) => {
    const minimumSalaries = [815615, 1312611, 1471382, 1524305, 1577230, 1709538, 1841849, 1974159, 2106470, 2116955, 2328652]
    let experience = player.experience
    if (experience > 10) {
      experience = 10
    }
    return minimumSalaries[experience]
  }

  maxCapPercentage = (player, ) => {
    let maxPercentage = 0
    if (player.experience <= 6) {
      maxPercentage = .25
    }
    if (player.experience >= 7 && player.experience <= 9) {
      maxPercentage = .3
    }
    if (player.experience >= 10) {
      maxPercentage = .35
    }
    return maxPercentage
  }

  createNewContract = (player, team) => {
    let newContract = {}
    newContract.start_date = "2018-07-01"
    newContract.no_trade = false
    newContract.trade_kicker = 1
    newContract.cap_hold = 0
    newContract.active = true
    newContract.two_way = false
    newContract.player_id = player.id
    newContract.team_id = team.id
    newContract.seasons = []
    newContract.dead_seasons = []
    this.startingSalaryHandler(this.state.startingSalary, this.state.raises).forEach(salary => {
      let season = {
        season: '2018-2019',
        salary: salary,
        guaranteed_salary: salary,
        player_option: this.state.playerOption,
        team_option: this.state.teamOption,
      }
      newContract.seasons.push(season)
    })
    return newContract
  }

  saveContractToPlayer = () => {
    const completedContract = this.createNewContract(this.props.player, this.props.team)
    this.props.player.contracts.unshift(completedContract)
  }



  render () {

    let inputs = this.startingSalaryHandler(this.state.startingSalary, this.state.raises).map( (salary, i) => {
      if (i === 0) {
        return <div key={i}><input
          type="text"
          name="what"
          placeholder={salary}
          value={salary}
          onChange={(event)=> this.salaryUpdateHandler(event)} />
        </div>
      } else {
        return <div key={i}><input
          type="text"
          name="what"
          placeholder={salary}
          value={salary}
          onChange={(event)=> this.salaryUpdateHandler(event)}
          disabled
        />
        </div>
      }
    })

    return (
      <Fragment>
        <div>{this.props.player.name} has {this.props.player.experience} years of experience in the NBA.</div>
        <div>Maximum Salary: {helpers.formatMoney(this.maxStartingSalary(this.props.player, this.props.seasonInfo))}</div>
        <div>Minimum Salary: {helpers.formatMoney(this.minimumStartingSalary(this.props.player))}</div>
        <form onSubmit={(event)=> this.submitHandler(event)}>
          <div className={styles.SignWithContainer}>
            <div>
              <label>
                Cap Space
                <input type="radio" name="sign_with" />
              </label>
            </div>
            <div>
              <label>
                Bird Rights
                <input type="radio" name="sign_with" />
              </label>
            </div>
            <div>
              <label>
                Non Bird Rights
                <input type="radio" name="sign_with" />
              </label>
            </div>
            <div>
              <label>
                Mid Level Exception
                <input type="radio" name="sign_with" />
              </label>
            </div>
            <div>
              <label>
                Minimum
                <input type="radio" name="sign_with" />
              </label>
            </div>
          </div>

          <div>
            <label>
              Contract Length:
              <select onChange={(event)=> this.contractLengthHandler(event)} value={this.state.contractLength}>
                {/* <option value="0">Choose Contract Length</option> */}
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="4">4 years</option>
                <option value="5">5 years</option>
              </select>
            </label>
          </div>

          {this.state.contractLength > 1 && <div>
            <label>
              Raises
              <select onChange={(event)=> this.raisesHandler(event)} value={this.state.raises}>
                <option value=".08">8 percent</option>
                <option value=".07">7 percent</option>
                <option value=".06">6 percent</option>
                <option value=".05">5 percent</option>
                <option value=".04">4 percent</option>
                <option value=".03">3 percent</option>
                <option value=".02">2 percent</option>
                <option value=".01">1 percent</option>
                <option value=".00" >No Raises</option>
                <option value="-.01">-1 percent</option>
                <option value="-.02">-2 percent</option>
                <option value="-.03">-3 percent</option>
                <option value="-.04">-4 percent</option>
                <option value="-.05">-5 percent</option>
                <option value="-.06">-6 percent</option>
                <option value="-.07">-7 percent</option>
                <option value="-.08">-8 percent</option>
              </select>
            </label>
          </div>}

          <div>
              <label>
                Set Salary To Max
                <input type="radio" name="set_salary" onChange={this.setMaxSalary}/>
              </label>
              <label>
                Set Salary to Minimum
                <input type="radio" name="set_salary" onChange={this.setMinSalary}/>
              </label>
          </div>

          {inputs}

          <div>Include a player option:<input type="checkbox" id="player_option" name="player_option" value="player_option" /></div>
          <div>Include a team option:<input type="checkbox" id="team_option" name="team_option" value="team_option" /></div>
          <button onClick={()=> (this.saveContractToPlayer(), this.props.createNewContract(this.props.player, this.props.team))}>Sign Player to Contract</button>

        </form>
      </Fragment>

    )
  }
}

export default NewContract
