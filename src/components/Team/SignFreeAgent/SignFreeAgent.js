import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/actions'
import styles from './SignFreeAgent.css'

class SignFreeAgent extends React.Component {

  state = {
    inputValue: ''
  }

  inputChangedHandler = (event) => {
    this.setState({
      inputValue: event.target.value
    })
  }

  searchFilter = () => {
      const filteredFreeAgents = this.props.freeAgents.filter((player) => {
       return player.name.toUpperCase().includes(this.state.inputValue.toUpperCase())
    })
    return filteredFreeAgents
  }

  render(){

    console.log(this.props)

    const freeAgents = this.searchFilter().map(player => {
      return <div
        key={player.id}
        onClick={()=> this.props.selectModalTarget(player)}
        className={styles.Player}>{player.name}</div>
      })
    return (
      <div>

        <input type="text" onChange={(event)=> (this.inputChangedHandler(event))} value={this.state.inputValue}/>
        <div>{freeAgents}</div>
        {this.searchFilter().length < 1 ? <div>If you can't find a player you expect to be a free agent, check to see if they have a player option that needs to be opted out of.</div> : null}

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tradeTeams: state.reducer.tradeTeams,
    freeAgents: state.reducer.freeAgents
  }
}

export default connect(mapStateToProps)(SignFreeAgent)
