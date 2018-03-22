import React from 'react'
import Aux from '../../hoc/Aux'
import styles from './Layout.css'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/actions'

class Layout extends React.Component {

  dateStuff = (date) => {
    return <div>{date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}</div>
  }

  _changeDate = (date) => {
    this.props.onChangeDate(date)
  }






  render () {

    const nbaDraft = 'June 21, 2018 19:00:00'
    const freeAgency = 'July 1, 2018 19:00:00'
    const dayFreeAgentsCanBeTraded = 'December 15, 2018 19:00:00'
    const tradeDeadline = 'February 7, 2019 19:00:00'



    return (
      <Aux>
        <div>{this.dateStuff(this.props.appDate)}</div>
        <button onClick={()=>this._changeDate(freeAgency)}>Change the Date</button>
        <main className={styles.Layout}>
          {this.props.children}
        </main>
        <div className={styles.footer}>
          Bluescreen Co 2018
        </div>
      </Aux>
    )
  }
}


const mapStateToProps = state => {
  return {
    appDate: state.teamSelector.appDate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeDate: (date)=> dispatch(actions.changeDate(date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
