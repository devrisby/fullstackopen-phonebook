import { useState, useEffect } from 'react'
import AddPersonComponent from './module/person/component/AddPersonComponent'
import Header from './components/Header'
import Notification from './components/Notification'
import { PersonType, PersonService, PeopleComponent, PersonSearchComponent } from './module/person'
import './App.css'


function App() {
  const [persons, setPersons] = useState<PersonType[]>([])
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async() => setPersons((await PersonService.getAll()).data)

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
      <AddPersonComponent persons={persons} setPersons={setPersons} setNotification={setNotificationMessage} />
      <Header title='Numbers' />
      <PeopleComponent search={search} persons={persons} setPersons={setPersons} setNotification={setNotificationMessage}  />
    </div>
  )
}

export default App
