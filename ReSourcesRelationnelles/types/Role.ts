import { User } from './index'

interface Role {
  idRole: number
  labelRole: string
  users: User[]
}

export default Role
