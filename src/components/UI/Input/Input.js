import React from 'react'
import classes from './Input.css'

const input = (props) => {
  let inputElement = null
  const inputClasses = [classes.InputElement]

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid)
  }

  if (props.elementType === 'textarea'){
    inputElement = <textarea
      className={inputClasses.join(' ')}
      {...props.elementConfig}
      value={props.value}
      onChange={props.changed}
    />
  } else if (props.elementType==="select") {
    inputElement = (
      <select
        className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.changed}
      >
        {props.elementConfig.options.map(option =>(
          <option key={option.value} value={option.value}>{option.displayValue}</option>
        ))}
      </select>
    )

  } else if (props.elementType==="range") {
    inputElement = (
      <input
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
       />
    )

  } else {
    inputElement = <input
      className={inputClasses.join(' ')}
      {...props.elementConfig}
      value={props.value}
      onChange={props.changed}
    />
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  )
}

export default input
