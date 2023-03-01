import { PersonActionType } from "../reducer/PersonActionType";
import { PersonStateType } from "../reducer/PersonStateType";
import PersonComponent from "./PersonComponent";

interface PropTypes {
    search: string
    state: PersonStateType;
    dispatch: React.Dispatch<PersonActionType>;
    setNotification: (message: string, error: boolean) => void
}

const PeopleComponent = ({search, state, dispatch, setNotification}: PropTypes) => {
    const filteredPersons = state.persons.filter(p => p.name.includes(search))

    if(filteredPersons){
        return (
            <div>
                {filteredPersons.map((p) => <PersonComponent key={p.id} person={p} state={state} dispatch={dispatch} setNotification={setNotification} />)}
            </div>
        )
    }  else {
        return <p>No contacts</p>
    }
    
}

export default PeopleComponent;