import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import styles from './Modal.css'

const modal = (props) => {
  return (
    <div className={styles.ModalContainer}>
      <div className={styles.Modal}>
        {props.children}
      </div>
      <Backdrop close={props.modalToggler}/>
    </div>
  )
}

export default modal
