import React from "react";
import Button from "./Button";
import {PersonStateType, PersonActionType, PersonActions, PersonService, PersonType } from "../module/person"

interface PropTypes {
    state: PersonStateType;
    dispatch: React.Dispatch<PersonActionType>;
    setNotification: (message: string, error: boolean) => void
}

const Form = ({state, dispatch, setNotification}: PropTypes) => {
    const handleNameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => dispatch({type: PersonActions.SETNEWNAME, payload: event.target.value })
    const handlePhoneOnChange = (event: React.ChangeEvent<HTMLInputElement>) => dispatch({type: PersonActions.SETNEWPHONE, payload: event.target.value})

    const handlePersonOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      try {
        if(!(state.newName && state.newPhone)) 
          setNotification(`Please fill out name and number!`, true)
        else if(checkIfPersonAlreadyExists()) 
          await handleExistingPerson(findExistingPerson()) 
        else
          await createPerson()
      } catch(e) {
        // @ts-ignore
        if(e.cause === 'ApiError') {
          // @ts-ignore
          setNotification(e.message, true)
        } else {
          setNotification('Server error! Please try again', true)
          console.log(e)
        }
      }
    }

    // handlePersonOnSubmit helpers
    const checkIfPersonAlreadyExists = () => state.persons.some(p => p.name === state.newName)
    const findExistingPerson = () => (state.persons.find(p => p.name === state.newName))!

    const handleExistingPerson = async (person: PersonType) => {
      const phoneIsDifferent = person.phone !== state.newPhone
      const promptPhoneUpdate = confirm(`${person?.name} is already added to phonebook. Replace old number with new one?`)

      if(phoneIsDifferent && promptPhoneUpdate) {
        await editPhone(person)
      } else {
        setNotification(`${state.newName} is already added to phonebook`, true)
      }
    }

    const editPhone = async (matchedPerson: PersonType) => {
      matchedPerson.phone = state.newPhone
      const updatedPersons = state.persons.map(p => p.id !== matchedPerson.id ? p: matchedPerson)
      dispatch({type: PersonActions.SETPERSONS, payload: updatedPersons})
      await PersonService.update(matchedPerson.id, matchedPerson);
    }

    const createPerson = async () => {
      const newPersonDTO = {
        name: state.newName,
        phone: state.newPhone
      }

      const response = await PersonService.create(newPersonDTO);

      dispatch({type: PersonActions.SETPERSONS, payload: state.persons.concat(response.data)})
      dispatch({type: PersonActions.SETNEWNAME, payload: ''})
      dispatch({type: PersonActions.SETNEWPHONE, payload: ''})
    }

    return (
      <form className="add_contact" onSubmit={handlePersonOnSubmit}>
          <label>
              <div>
                  <p>name:</p>
              </div>
              <div>
                  <input type="text" value={state.newName} onChange={handleNameOnChange} />
              </div>
          </label>
          <label>
              <div>
                  <p>number:</p>
              </div>
              <div>
                  <input type="text" value={state.newPhone} onChange={handlePhoneOnChange} />
              </div>
          </label>
          <Button label="add" type="submit"/>
      </form>
  )
}

export default Form;