import React, { Component } from 'react'
import axios from 'axios'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

import styles from './AddContract.css'

class AddContract extends Component {

  state = {
    addContractForm: {
      team_id: {
        elementType: 'select',
        elementConfig: {
          options: [ { value: 0, displayValue: 'Loading' } ]
        },
        value: 0
      },
      player_id: {
        elementType: 'select',
        elementConfig: {
          options: [ { value: 0, displayValue: 'Loading' } ]
        },
        value: 0
      },
      contract_years: {
        elementType: 'select',
        elementConfig: {
          options: [ { value: 0, displayValue: 'Loading' },
                     { value: 1, displayValue: '1 year' },
                     { value: 2, displayValue: '2 year' },
                     { value: 3, displayValue: '3 year' },
                     { value: 4, displayValue: '4 year' },
          ]
        },
        value: 0
      },
      salary: {
        elementType: 'input',
        elementConfig: {
          type: 'range',
          min: '0',
          max: '100',
          step: '1'
        },
        value: 0
      },
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
      }
    }
  }

  componentDidMount () {
    axios.get('http://localhost:3000/teams.json')
    .then( res => {
      console.log(res.data)

      const teamArray = [ {value: 0, displayValue: 'Select Team'} ]

      res.data.forEach((team)=>{
        teamArray.push({value: team.id, displayValue: team.team_name})
      })

      this.setState( prevState => ({
        ...prevState,
        addContractForm: {
          ...prevState.addContractForm,
          team_id: {
            ...prevState.addContractForm.team_id,
            elementConfig: {
              ...prevState.addContractForm.team_id.elementConfig,
              options: teamArray
            }
          }
        }
      }))
    })
    .catch( error => console.log(error))
  }

  inputChangedHandler = (event, id) => {
    const updatedAddContractForm = {
      ...this.state.addContractForm
    }
    const updatedFormElement = {
      ...updatedAddContractForm[id]
    }

    updatedFormElement.value = event.target.value
    updatedAddContractForm[id] = updatedFormElement

      this.setState({
        addContractForm: updatedAddContractForm,
      })

      if (id === 'team_id') {
        axios.get(`http://localhost:3000/teams/${updatedFormElement.value}.json`)
        .then( res => {
          console.log(res.data.players)
          const playerArray = [{value: 0, displayValue: 'Select Player'}]

          res.data.players.forEach((player)=>{
            playerArray.push({value: player.id, displayValue: player.name})
          })

          this.setState( prevState => ({
            ...prevState,
            addContractForm: {
              ...prevState.addContractForm,
              player_id: {
                ...prevState.addContractForm.player_id,
                elementConfig: {
                  ...prevState.addContractForm.player_id.elementConfig,
                  options: playerArray
                }
              }
            }
          }))
        })
        .catch( error => console.log(error))
      }
      console.log(updatedFormElement.value);
    }

  render () {

    const formElementArray = []

    for (let key in this.state.addContractForm) {
      formElementArray.push({
        id: key,
        config: this.state.addContractForm[key]
      })
    }

    let form = (
      <form onSubmit={this.addContractHandler}>
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event)=> this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success">Add Contract</Button>
      </form>
    )

    return (
      <div className={styles.AddContract}>
        {form}
      </div>
    )
  }
}

export default AddContract
