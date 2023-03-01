import type PersonType from '../model/PersonType'

export interface PersonStateType {
  persons: PersonType[]
  newName: string
  newPhone: string
}
