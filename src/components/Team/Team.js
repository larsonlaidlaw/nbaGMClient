import React from 'react'

import TeamHeader from './TeamHeader/TeamHeader'
import TeamAssets from './TeamAssets/TeamAssets'

import styles from './Team.css'


const team = (props) => {
  // can this be moved to a module?

  let classes = [styles.Team]

  if (props.team.nickname === 'hawks') {
    classes.push(styles.Hawks)
  }

  if (props.team.nickname === 'celtics') {
    classes.push(styles.Celtics)
  }

  if (props.team.nickname === 'nets') {
    classes.push(styles.Nets)
  }

  if (props.team.nickname === 'hornets') {
    classes.push(styles.Hornets)
  }

  if (props.team.nickname === 'bulls') {
    classes.push(styles.Bulls)
  }

  if (props.team.nickname === 'cavaliers') {
    classes.push(styles.Cavaliers)
  }

  if (props.team.nickname === 'mavericks') {
    classes.push(styles.Mavericks)
  }

  if (props.team.nickname === 'nuggets') {
    classes.push(styles.Nuggets)
  }

  if (props.team.nickname === 'pistons') {
    classes.push(styles.Pistons)
  }

  if (props.team.nickname === 'warriors') {
    classes.push(styles.Warriors)
  }

  if (props.team.nickname === 'rockets') {
    classes.push(styles.Rockets)
  }

  if (props.team.nickname === 'pacers') {
    classes.push(styles.Pacers)
  }

  if (props.team.nickname === 'clippers') {
    classes.push(styles.Clippers)
  }

  if (props.team.nickname === 'lakers') {
    classes.push(styles.Lakers)
  }

  if (props.team.nickname === 'grizzlies') {
    classes.push(styles.Grizzlies)
  }

  if (props.team.nickname === 'heat') {
    classes.push(styles.Heat)
  }

  if (props.team.nickname === 'bucks') {
    classes.push(styles.Bucks)
  }

  if (props.team.nickname === 'timberwolves') {
    classes.push(styles.Timberwolves)
  }

  if (props.team.nickname === 'pelicans') {
    classes.push(styles.Pelicans)
  }

  if (props.team.nickname === 'knicks') {
    classes.push(styles.Knicks)
  }

  if (props.team.nickname === 'thunder') {
    classes.push(styles.Thunder)
  }

  if (props.team.nickname === 'magic') {
    classes.push(styles.Magic)
  }

  if (props.team.nickname === '76ers') {
    classes.push(styles.Sixers)
  }

  if (props.team.nickname === 'suns') {
    classes.push(styles.Suns)
  }

  if (props.team.nickname === 'blazers') {
    classes.push(styles.Blazers)
  }

  if (props.team.nickname === 'kings') {
    classes.push(styles.Kings)
  }

  if (props.team.nickname === 'spurs') {
    classes.push(styles.Spurs)
  }

  if (props.team.nickname === 'raptors') {
    classes.push(styles.Raptors)
  }

  if (props.team.nickname === 'jazz') {
    classes.push(styles.Jazz)
  }

  if (props.team.nickname === 'wizards') {
    classes.push(styles.Wizards)
  }

  return (
    <div className={classes.join(' ')}>
      <TeamHeader team={props.team}/>
      <TeamAssets team={props.team} addPlayerToTrade={props.addPlayerToTrade}/>
    </div>
  )
}

export default team
