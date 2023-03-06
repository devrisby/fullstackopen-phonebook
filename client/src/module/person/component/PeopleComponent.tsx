import PersonType from "../model/PersonType";
import PersonComponent from "./PersonComponent";

interface PropTypes {
    search: string,
    persons: PersonType[],
    setPersons: React.Dispatch<React.SetStateAction<PersonType[]>>,
    setNotification: (message: string, error: boolean) => void
}

const PeopleComponent = ({search, persons, setPersons, setNotification}: PropTypes) => {
    const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

    if(filteredPersons){
        return (
            <div>
                {filteredPersons.map((p) => <PersonComponent key={p.id} person={p} persons={persons} setPersons={setPersons} setNotification={setNotification} />)}
            </div>
        )
    }  else {
        return <p>No contacts</p>
    }
    
}

export default PeopleComponent;