import PersonActions from './PersonActions'
import type PersonType from '../model/PersonType'
import type { PersonActionType } from './PersonActionType'
import type { PersonStateType } from './PersonStateType'

export default (state: PersonStateType, action: PersonActionType) => {
  switch (action.type) {
    case PersonActions.SETPERSONS:
      return { ...state, persons: action.payload as PersonType[] }
    case PersonActions.SETNEWNAME:
      return { ...state, newName: action.payload as string }
    case PersonActions.SETNEWPHONE:
      return { ...state, newPhone: action.payload as string }
    default:
      throw new Error()
  }
}
