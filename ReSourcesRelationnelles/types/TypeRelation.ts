import { Resource, StateTypeRelation, User } from './index'

interface TypeRelation {
  idTypeRelation: number
  labelTypeRelation: string
  users: User[]
  resources: Resource[]
  stateTypeRelation: StateTypeRelation[]
}

export default TypeRelation
