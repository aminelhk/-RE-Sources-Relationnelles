import { Resource, Role, Share, TypeRelation } from './index'

interface User {
  idUser: number
  email: string
  firstName: string
  lastName: string
  phone: string
  password: string
  pseudo: string
  isActive: boolean
  isPrivate: boolean
  vitalCardNumber: string
  ressources: Resource[]
  typesRelation: TypeRelation[]
  role: Role
  roleId: number
  resourcesShared: Share[]
}

export default User
