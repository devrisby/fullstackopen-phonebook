import { useState, useEffect, useReducer } from 'react'
import Form from './components/Form'
import Header from './components/Header'
import Notification from './components/Notification'
import { PersonType, PersonReducer, PersonActions, PersonService, PeopleComponent, PersonSearchComponent } from './module/person'
import './App.css'

const personInitial = {
    persons: new Array<PersonType>(),
    newName: '',
    newPhone: '',
}

function App() {
  const [state, dispatch] = useReducer(PersonReducer, personInitial)
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async() => dispatch({type: PersonActions.SETPERSONS, payload: (await PersonService.getAll()).data})

    fetchData()
  }, [])

  const setNotificationMessage = (message: string, error: boolean) => {
    setNotification(message)
    setError(error)

    setTimeout(() => {
      setNotification('')
      setError(false)
    }, 5000)
  }

  return (
    <div className="app">
      <Header title='Phonebook' />
      <Notification message={notification} error={error} />
      <PersonSearchComponent search={search} setSearch={setSearch} />
      <Header title='Add Contact' />
      <Form state={state} dispatch={dispatch} setNotification={setNotificationMessage} />
      <Header title='Numbers' />
      <PeopleComponent search={search} state={state} dispatch={dispatch} setNotification={setNotificationMessage}  />
    </div>
  )
}

export default App
