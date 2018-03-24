import React from 'react'

export const formatMoney = (money) => {
  money = money.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')
  money = '$' + money
  return money
}

export const formatDate = (date) => {
  return <div>{date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}</div>
}
