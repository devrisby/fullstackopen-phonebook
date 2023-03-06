import Button from "../../../components/Button";
import PersonType from "../model/PersonType";
import PersonService from "../PersonService";

interface PropTypes {
    person: PersonType;
    persons: PersonType[],
    setPersons: React.Dispatch<React.SetStateAction<PersonType[]>>,
    setNotification: (message: string, error: boolean) => void
}

const PersonComponent = ({person, persons, setPersons, setNotification}: PropTypes ) => {
    const handleDeleteOnClick = async (person: PersonType) => {
        if(confirm(`Delete ${person.name}?`)){
            try {
                await PersonService.remove(person.id);
                setPersons(persons.filter(p => p.id != person.id))

            } catch (e) {
                console.log("Error", e)
                setNotification(`Information of ${person.name} has already been removed from server`, true);
            }
        }
    }

    return (
        <div className="person">
            <div>
                <p className="name">{person.name}</p>
                <p>{person.phone}</p>
            </div>
            <div>
                <Button label="delete" action={() => handleDeleteOnClick(person)} type={undefined} />
            </div>
        </div>
    )
}

export default PersonComponent