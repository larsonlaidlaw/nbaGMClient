import React from 'react'
import styles from './CapHold.css'
import TradeMenu from '../../Players/Player/TradeMenu/TradeMenu'

class CapHold extends React.Component {

  state = {
    showMenu: false,
  }

  menuHandler = (event) => {
    // console.log('hit the menuHandler');
    event.stopPropagation()
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  render () {

    const formatCapHold = (player) => {

      let cap_hold = player.contracts[0].cap_hold
      cap_hold = cap_hold.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')
      cap_hold = '$' + cap_hold

      return cap_hold
    }

    return (
      <div>
        <div
          className={styles.MenuContainer}
          onClick={this.menuHandler}>
          {this.state.showMenu &&
            <TradeMenu
              onMouseDown={(event)=> this.menuHandler(event)}
              player={this.props.player}
              menuHandler={this.menuHandler}
              menuType={this.props.menuType}
              // modalToggler={this.modalToggler}
              // showModal={this.state.showModal}
              {...this.props}
            />}
            <div className={styles.CapHold}>
              <div>{this.props.player.name}</div>
              <div>{formatCapHold(this.props.player)}</div>
              {this.props.player.team_id === null ? <div className={styles.Renounced}> Renounced </div> : null}
            </div>
          </div>
      </div>
    )
  }
}



export default CapHold
