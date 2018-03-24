import React, { Component } from 'react'
import DateSelect from '../DateSelect/DateSelect'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/actions'
import * as helpers from '../../helpers/helpers'
import styles from './SeasonInfo.css'

class SeasonInfo extends Component {


  _changeDate = (event, year, months, day) => {
    event.preventDefault()
    this.props.onChangeDate(year, months, day)
    this.props.onSetSeason()
  }


  render (){
    return (
      <div className={styles.SeasonInfo}>
        <DateSelect />
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
    seasonInfo: state.reducer.seasonInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeDate: (year, month, day)=> dispatch(actions.changeDate(year, month, day)),
    onSetSeason: ()=> dispatch(actions.setSeason())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonInfo)
