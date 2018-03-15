import React, { Component } from 'react'
import axios from 'axios'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

import styles from './AddPlayer.css'

class AddPlayer extends Component {

  state = {
    addPlayerForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Player Name'
        },
        value: '',
      },
      birth_date: {
        elementType: 'input',
        elementConfig: {
          type: 'date',
          placeholder: 'Date of Birth'
        },
        value: '',
      },
      team_id: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 0, displayValue: 'Free Agent' },
            { value: 1, displayValue: 'Cavaliers' },
            { value: 2, displayValue: 'Celtics' },
          ]
        },
        value: 0
      }
    }
  }

  componentDidMount () {
    axios.get('http://localhost:3000/teams.json')
    .then( res => {
      console.log(res.data)
    })
    .catch( error => console.log(error))
  }

  inputChangedHandler = (event, id) => {
    const updatedAddPlayerForm = {
      ...this.state.addPlayerForm
    }

    const updatedFormElement = {
      ...updatedAddPlayerForm[id]
    }

    updatedFormElement.value = event.target.value
    // updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
    // updatedFormElement.touched= true
    updatedAddPlayerForm[id] = updatedFormElement

    // let formIsValid = true
    // for (let inputIdentifier in updatedOrderForm) {
    //   formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
      this.setState({
        addPlayerForm: updatedAddPlayerForm,
      })
    }

    addPlayerHandler = (event) => {
      event.preventDefault()
      console.log('add player');
      const player = {}
      for (let formElement in this.state.addPlayerForm) {
        player[formElement] = this.state.addPlayerForm[formElement].value
      }
      console.log(player);

      axios.post('http://localhost:3000/players', player)
      .then((response)=> {
        console.log(response);
      })
      .catch(error => console.log(error))
    }

  render () {

    const formElementArray = []

    for (let key in this.state.addPlayerForm) {
      formElementArray.push({
        id: key,
        config: this.state.addPlayerForm[key]
      })
    }

    let form = (
      <form onSubmit={this.addPlayerHandler}>
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event)=> this.inputChangedHandler(event, formElement.id)}
            // invalid={!formElement.config.valid}
            // shouldValidate={formElement.config.validation}
            // touched={formElement.config.touched}
          />
        ))}
        <Button btnType="Success">Add Player</Button>
      </form>
)
    return (
      <div className={styles.AddPlayer}>
        {form}
      </div>
    )
  }
}

export default AddPlayer
