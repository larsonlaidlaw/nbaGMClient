import React from 'react'
import styles from './TransactionFeedback.css'
import * as tradeHelpers from '../../../helpers/tradeHelpers'
import * as helpers from '../../../helpers/helpers'

const transactionFeedback = (props) => {
  let classes = [styles.TransactionFeedback]
  let message = ''

  let transactionFeedback = tradeHelpers.transactionFeedback(props.team, props.seasonInfo)

  if (transactionFeedback.isValid) {
    classes.push(styles.Valid)
    message = `Everything looks good!`
    // message = `Incoming Salary: ${transactionFeedback.feedback.incoming}, Outgoing Salary: ${transactionFeedback.feedback.outgoing}`
  } else {
    classes.push(styles.inValid)
    message = `This transaction takes ${transactionFeedback.feedback.message}. To aquire ${helpers.formatMoney(transactionFeedback.feedback.incoming)} in salary, at least ${helpers.formatMoney(transactionFeedback.feedback.requiredOutgoing)} must be sent out. Please add ${helpers.formatMoney(transactionFeedback.feedback.requiredOutgoing - transactionFeedback.feedback.outgoing)} more to the trade or remove ${helpers.formatMoney(tradeHelpers.calculateTeamTotalSalary(props.team) - props.seasonInfo.salaryCap)} in salary to get under the Salary Cap.`
  }

  return(
    <div className={styles.TransactionFeedback}>
      <div className={classes.join(' ')}>
        <div>{message}</div>
      </div>
    </div>
  )
}

export default transactionFeedback
