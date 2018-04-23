import React, { Component } from 'react'
import DateSelect from '../DateSelect/DateSelect'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/actions'
import * as helpers from '../../helpers/helpers'
import styles from './SeasonInfo.css'

class SeasonInfo extends Component {

  formatDate = (date) => {
    return <div>{date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}</div>
  }

  _changeDate = (event, year, months, day) => {
    event.preventDefault()
    this.props.onChangeDate(year, months, day)
    this.props.onSetSeason()
    let seasonIndex = this.props.seasonIndex
    this.props.onRemoveAllTradeTeams()
    this.props.onInitFreeAgents(seasonIndex)
    this.props.tradeTeams.forEach(team => {
      this.props.onInitTradeTeamData(team)
    })
  }

  render (){

    const React = require('react')
    // console.log(React.version);
    return (
      <div className={styles.SeasonInfo}>
        {/* <div>{this.formatDate(this.props.appDate)}</div> */}
        <DateSelect changeDate={this._changeDate} appDate={this.props.appDate}/>
        <div>Season: {this.props.seasonInfo.season}</div>
        <div>Salary Cap: {helpers.formatMoney(this.props.seasonInfo.salaryCap)}</div>
        <div>Luxury Tax: {helpers.formatMoney(this.props.seasonInfo.luxuryTax)}</div>
        <div>Tax Apron: {helpers.formatMoney(this.props.seasonInfo.apron)}</div>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    appDate: state.reducer.appDate,
    seasonInfo: state.reducer.seasonInfo,
    tradeTeams: state.reducer.tradeTeams,
    seasonIndex: state.reducer.seasonIndex
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeDate: (year, month, day)=> dispatch(actions.changeDate(year, month, day)),
    onSetSeason: ()=> dispatch(actions.setSeason()),
    onRemoveAllTradeTeams: ()=> dispatch(actions.removeAllTradeTeams()),
    onInitTradeTeamData: (team)=> dispatch(actions.initTeamTradeData(team)),
    onInitFreeAgents: (seasonIndex)=> dispatch(actions.initFreeAgents(seasonIndex))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonInfo)
