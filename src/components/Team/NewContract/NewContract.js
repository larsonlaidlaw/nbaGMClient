import React, { Fragment, Component } from 'react'

import * as helpers from '../../../helpers/helpers'
import * as newContractHelpers from '../../../helpers/newContractHelpers'
import * as teamSalaryHelpers from '../../../helpers/teamSalaryHelpers'
import styles from './NewContract.css'

class NewContract extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startingSalary: newContractHelpers.calculatePlayerMaxSalary(this.props.player, this.props.seasonInfo),
      maxStartingSalary: 0,
      contractLength: 1,
      maxContractLength: 4,
      raises: .00,
      maxRaises: .00,
      playerOption: false,
      teamOption: false,
      signMethodSelected: false
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
    let newStartingSalary = parseInt(event.target.value)
    // if (newStartingSalary > this.state.maxStartingSalary) {
    //   newStartingSalary = this.state.maxStartingSalary
    // }

    this.setState({
      startingSalary: newStartingSalary
    })
  }

  raisesHandler = (event) => {
    this.setState({
      raises: event.target.value
    })
  }


  setMaxSalary = () => {
    this.setState({
      startingSalary: newContractHelpers.calculatePlayerMaxSalary(this.props.player, this.props.seasonInfo)
    })
  }

  setMinSalary = () => {
    this.setState({
      startingSalary: newContractHelpers.calculatePlayerMinSalary(this.props.player)
    })
  }

  capSpaceHandler = (obj) => {
    this.setState({
      maxRaises: .05,
      maxContractLength: 4,
      startingSalary: obj.startingSalary,
      maxStartingSalary: obj.startingSalary,
      signMethodSelected: true

    })
  }

  midLevelHandler = (obj) => {
    this.setState({
      maxRaises: .05,
      maxContractLength: obj.maxContractLength,
      startingSalary: obj.startingSalary,
      maxStartingSalary: obj.startingSalary,
      signMethodSelected: true
    })
  }

  minimumHandler = () => {
    this.setState({
      maxRaises: .05,
      maxContractLength: 2,
      maxStartingSalary: newContractHelpers.calculatePlayerMinSalary(this.props.player),
      startingSalary: newContractHelpers.calculatePlayerMinSalary(this.props.player),
      signMethodSelected: true
    })
  }

  birdRightsHandler = (obj) => {
    console.log('birdrightshandler', obj);
    this.setState({
      maxRaises: obj.raises,
      maxContractLength: obj.maxContractLength,
      maxStartingSalary: obj.maxStartingSalary,
      startingSalary: obj.startingSalary,
      signMethodSelected: true
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
  }

  playerOptionHandler = () => {

    let newPlayerOptionState = !this.state.playerOption
    this.setState({
      playerOption: newPlayerOptionState,
      teamOption: false
    })
  }

  teamOptionHandler = () => {
    let newTeamOptionState = !this.state.teamOption
    this.setState({
      teamOption: newTeamOptionState,
      playerOption: false
    })
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
        player_option: false,
        team_option: false
      }
      newContract.seasons.push(season)
    })
    newContract.seasons[this.state.contractLength - 1].player_option = this.state.playerOption
    newContract.seasons[this.state.contractLength - 1].team_option = this.state.teamOption
    return newContract
  }

  saveContractToPlayer = () => {
    const completedContract = this.createNewContract(this.props.player, this.props.team)
    this.props.player.contracts.unshift(completedContract)
  }

  render () {

    let classes = []

    if (this.state.startingSalary > this.state.maxStartingSalary) {
      classes.push(styles.Validation)
    }

    let totalContractAmount = 0

    let inputs = this.startingSalaryHandler(this.state.startingSalary, this.state.raises).map( (salary, i) => {
      if (i === 0) {
        totalContractAmount += salary
        return <div key={i}><input
          className={classes.join(' ')}
          type="text"
          placeholder={salary}
          value={salary}
          onChange={(event)=> this.salaryUpdateHandler(event)} />
        </div>
      } else {
        totalContractAmount += salary
        return <div key={i}><input
          className={classes.join(' ')}
          type="text"
          placeholder={salary}
          value={salary}
          onChange={(event)=> this.salaryUpdateHandler(event)}
          disabled
        />
        </div>
      }
    })

    if (inputs.length > this.state.maxContractLength) {
      inputs.pop()
    }

    return (
      <Fragment>
        <div>{this.props.player.name} has {this.props.player.experience} years of experience in the NBA.</div>

        <div>Maximum Salary: {helpers.formatMoney(newContractHelpers.calculatePlayerMaxSalary(this.props.player, this.props.seasonInfo))}</div>

        <div>Minimum Salary: {helpers.formatMoney(newContractHelpers.calculatePlayerMinSalary(this.props.player))}</div>

        {teamSalaryHelpers.calculateTeamTotalSalary(this.props.team) < this.props.seasonInfo.salaryCap ?
          <div>
            The {this.props.team.team_name} have {helpers.formatMoney(this.props.seasonInfo.salaryCap - teamSalaryHelpers.calculateTeamTotalSalary(this.props.team, this.props.seasonInfo.salaryCap))} in Cap Space available.
          </div> :
           <div>
             The {this.props.team.team_name} are over the Salary Cap.
           </div>
         }

        <form onSubmit={(event)=> this.submitHandler(event)}>
          <div className={styles.SignWithContainer}>
            {teamSalaryHelpers.isUnderSalaryCap(this.props.team, this.props.seasonInfo) && <div>
              <label>
                <input type="radio" name="sign_with" onChange={()=> this.capSpaceHandler(newContractHelpers.useCapSpace(this.props.player, this.props.team, this.props.seasonInfo))}/>
                Cap Space
              </label>
            </div>}
            {newContractHelpers.birdRights(this.props.player, this.props.team, this.props.seasonInfo) && <div>
              <label>
                <input type="radio" name="sign_with" onChange={()=> this.birdRightsHandler(newContractHelpers.birdRights(this.props.player, this.props.team, this.props.seasonInfo))}/>
                Bird Rights
              </label>
            </div>}
            <div>
              <label>
                <input type="radio" name="sign_with" onChange={()=> this.midLevelHandler(newContractHelpers.midLevelException(newContractHelpers.whichMidLevel(this.props.team, this.props.seasonInfo)))}/>
                Mid Level Exception
              </label>
            </div>
            <div>
              <label>
                <input type="radio" name="sign_with" onChange={()=> this.minimumHandler()}/>
                Minimum
              </label>
            </div>
          </div>


          {this.state.signMethodSelected && <div>
            <div>
              <label>
                Contract Length:
                <select onChange={(event)=> this.contractLengthHandler(event)} value={this.state.contractLength}>
                  {/* <option value="0">Choose Contract Length</option> */}
                  <option value="1">1 year</option>
                  {this.state.maxContractLength > 1 && <option value="2">2 years</option> }
                  {this.state.maxContractLength > 2 && <option value="3">3 years</option> }
                  {this.state.maxContractLength > 3 && <option value="4">4 years</option> }
                  {this.state.maxContractLength > 4 && <option value="5">5 years</option> }
                </select>
              </label>
            </div>

          {this.state.contractLength > 1 && <div>
            <label>
              Raises
              <select onChange={(event)=> this.raisesHandler(event)} value={this.state.raises}>
                <option value=".00" >No Raises</option>
                {this.state.maxRaises > .07 && <option value=".08">8 percent</option>}
                {this.state.maxRaises > .06 && <option value=".07">7 percent</option>}
                {this.state.maxRaises > .05 && <option value=".06">6 percent</option>}
                <option value=".05">5 percent</option>
                <option value=".04">4 percent</option>
                <option value=".03">3 percent</option>
                <option value=".02">2 percent</option>
                <option value=".01">1 percent</option>
                <option value="-.01">-1 percent</option>
                <option value="-.02">-2 percent</option>
                <option value="-.03">-3 percent</option>
                <option value="-.04">-4 percent</option>
                <option value="-.05">-5 percent</option>
                {this.state.maxRaises > .05 && <option value="-.06">-6 percent</option>}
                {this.state.maxRaises > .06 && <option value="-.07">-7 percent</option>}
                {this.state.maxRaises > .07 && <option value="-.08">-8 percent</option>}
              </select>
            </label>
          </div>}

          {inputs}



          <div>Include a player option:
            <input
            type="checkbox"
            id="player_option"
            name="player_option"
            checked={this.state.playerOption}
            value={this.state.playerOption}
            onChange={this.playerOptionHandler}
          />
          </div>
          <div>Include a team option:
            <input
            type="checkbox"
            id="team_option"
            name="team_option"
            checked={this.state.teamOption}
            value="team_option"
            onChange={this.teamOptionHandler}
            />
          </div>
        </div>}
          {this.state.signMethodSelected && <button
            onClick={()=> (this.saveContractToPlayer(), this.props.createNewContract(this.props.player, this.props.team), this.props.modalToggler(null, this.props.team))}
            disabled={this.state.startingSalary > this.state.maxStartingSalary}
            >Sign {this.props.player.name} to a {this.state.contractLength} year / {helpers.formatMoney(totalContractAmount)} contract</button>}

        </form>
      </Fragment>

    )
  }
}

export default NewContract
