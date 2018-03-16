import React from 'react'
import styles from './Hover.css'

const hover = (props) => {
  return (
    <div className={styles.Hover} onClick={props.onAddPlayerToTrade}>
        <div>Trade to:</div>
        <hr />
        <div className={styles.HoverItem}>Bulls</div>
        <div className={styles.HoverItem}>Kings</div>
        <hr />
        <div className={styles.HoverItem}>Release</div>
    </div>
  )
}


export default hover
