import React from 'react'
import styles from './CircleImage.css'

const circleImage = (props) =>  {
  const imagePath = require('../../../../../../assets/images/players/' + props.fileName + '.png')

  return (
    <div className={styles.CircleImage}>
      <img src={imagePath} alt="player-name" />
    </div>
  )
}

export default circleImage
