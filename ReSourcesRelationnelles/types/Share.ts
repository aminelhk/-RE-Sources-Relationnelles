import { Resource, User } from './index'

interface Share {
  user: User
  userId: number
  resource: Resource
  resourceId: number
  isFavorite: boolean
  isArchived: boolean
  isexploited: boolean
}

export default Share
