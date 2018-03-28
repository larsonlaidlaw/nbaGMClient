import React, { Component } from 'react'
import styles from './DateSelect.css'
import Input from '../UI/Input/Input'

class DateSelect extends Component {

  state = {
    changeTheDateForm: {
      month_id: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 0, displayValue: 'January' },
            { value: 1, displayValue: 'February' },
            { value: 2, displayValue: 'March' },
            { value: 3, displayValue: 'April' },
            { value: 4, displayValue: 'May' },
            { value: 5, displayValue: 'June' },
            { value: 6, displayValue: 'July' },
            { value: 7, displayValue: 'August' },
            { value: 8, displayValue: 'September' },
            { value: 9, displayValue: 'October' },
            { value: 10, displayValue: 'November' },
            { value: 11, displayValue: 'December' }
          ]
        },
        value: 0
      },
      date_id: {
        elementType: 'select',
        elementConfig: {
          options: [ { value: 1, displayValue: 1 } ]
        },
        value: 1
      },
      year_id: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 2017, displayValue: '2017' },
            { value: 2018, displayValue: '2018' },
            { value: 2019, displayValue: '2019' },
            { value: 2020, displayValue: '2020' },
            { value: 2021, displayValue: '2021' },
            { value: 2022, displayValue: '2022' },
            { value: 2023, displayValue: '2023' },
          ]
        },
        value: 0
      }
    }
  }



  componentDidMount () {
    const dateArray = []

    for (let i = 0; i < 31; i++){
      dateArray.push( {value: i + 1, displayValue: i + 1} )
    }

    this.setState( prevState => ({
      ...prevState,
      changeTheDateForm: {
        ...prevState.changeTheDateForm,
        date_id: {
          ...prevState.changeTheDateForm.date_id,
          elementConfig: {
            ...prevState.changeTheDateForm.date_id.elementConfig,
            options: dateArray
          }
        }
      }
    }))
  }

  inputChangedHandler = (event, id) => {
    const updatedForm = {
      ...this.state.changeTheDateForm
    }
    const updatedFormElement = {
      ...updatedForm[id]
    }

    updatedFormElement.value = event.target.value
    updatedForm[id] = updatedFormElement

      this.setState({
        changeTheDateForm: updatedForm,
      })

      console.log(updatedFormElement.value);
    }

  render () {

    const dateElementArray = []

    for (let key in this.state.changeTheDateForm) {
      dateElementArray.push({
        id: key,
        config: this.state.changeTheDateForm[key]
      })
    }

    let form = (
      <form onSubmit={this.addContractHandler}>
        {dateElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event)=> this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <button onClick={(event)=>this.props.changeDate(event, this.state.changeTheDateForm.year_id.value, this.state.changeTheDateForm.month_id.value, this.state.changeTheDateForm.date_id.value)}>Change the Date</button>

      </form>
    )

    return (
      <div className={styles.AddContract}>
        {form}
      </div>
    )
  }
}

export default DateSelect
