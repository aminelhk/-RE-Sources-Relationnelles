import { Resource, TypeRelation } from './index'

interface StateTypeRelation {
  idStateTypeRelation: number
  labelStateTypeRelation: string
  typesRelation: TypeRelation[]
  resources: Resource[]
}

export default StateTypeRelation
