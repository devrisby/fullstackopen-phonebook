// Components
import PeopleComponent from './component/PeopleComponent'
import PersonComponent from './component/PersonComponent'
import PersonSearchComponent from './component/PersonSearchComponent'

// Models
import type PersonDtoType from './model/PersonDtoType'
import type PersonType from './model/PersonType'

// Reducer
import type { PersonActionType } from './reducer/PersonActionType'
import type { PersonStateType } from './reducer/PersonStateType'
import PersonActions from './reducer/PersonActions'
import PersonReducer from './reducer/PersonReducer'

// API Service
import PersonService from './PersonService'

export {
  PeopleComponent,
  PersonComponent,
  PersonSearchComponent,
  PersonActions,
  PersonReducer,
  PersonService,
}

export type { PersonDtoType, PersonType, PersonActionType, PersonStateType }
