import React, { useRef } from "react";
import Button from "../../../components/Button";
import PersonType from "../model/PersonType";
import PersonService from "../PersonService";

interface PropTypes {
  persons: PersonType[],
  setPersons: React.Dispatch<React.SetStateAction<PersonType[]>>,
  setNotification: (message: string, error: boolean) => void
}

const AddPersonComponent = ({persons, setPersons, setNotification}: PropTypes) => {

  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  const handlePersonOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const originalPersons = [...persons].map(p => ({...p}))
    
    try {
      if(nameRef.current && phoneRef.current) {
        if(!(nameRef.current.value && phoneRef.current.value)) 
          setNotification(`Please fill out name and number!`, true)
        else if(checkIfPersonAlreadyExists(nameRef.current.value)) 
          await handleExistingPerson(nameRef.current.value, phoneRef.current.value) 
        else
          await createPerson(nameRef.current.value, phoneRef.current.value)
      } 
    } catch(e) {
      // @ts-ignore
      if(e.cause === 'ApiError') {
        // @ts-ignore
        setNotification(e.message, true)
        setPersons(originalPersons)
      } else {
        setNotification('Server error! Please try again', true)
        setPersons(originalPersons)
      }
    }
  }


  // handlePersonOnSubmit helpers
  const checkIfPersonAlreadyExists = (newName: string) => persons.some(p => p.name === newName)

  const handleExistingPerson = async (newName: string, newPhone: string) => {
    const person: PersonType = persons.find(p => p.name === newName)!

    // booleans
    const phoneIsDifferent = person.phone !== newPhone
    const updatePhonePrompt = confirm(`${person?.name} is already added to phonebook. Replace old number with new one?`)

    if(updatePhonePrompt) {
      if(phoneIsDifferent) {
        await editPhone(person, newPhone)
      } else {
        setNotification(`${person?.name} is already added to phonebook`, true)
      }
    }
  }

  // update phone number of person
  const editPhone = async (matchedPerson: PersonType, newPhone: string) => {
    matchedPerson.phone = newPhone
    const updatedPersons = persons.map(p => p.id !== matchedPerson.id ? p: matchedPerson)
    await PersonService.update(matchedPerson.id, matchedPerson);
    setPersons(updatedPersons)    
  }

  const createPerson = async (newName: string, newPhone: string) => {
    const newPersonDTO = {
      name: newName,
      phone: newPhone
    }

    const response = await PersonService.create(newPersonDTO);

    setPersons(persons.concat(response.data))
  }

  return (
    <form className="add_contact" onSubmit={handlePersonOnSubmit}>
        <label>
            <div>
                <p>name:</p>
            </div>
            <div>
                <input type="text" ref={nameRef} />
            </div>
        </label>
        <label>
            <div>
                <p>number:</p>
            </div>
            <div>
                <input type="text" ref={phoneRef} />
            </div>
        </label>
        <Button label="add" type="submit"/>
    </form>
  )
}

export default AddPersonComponent;