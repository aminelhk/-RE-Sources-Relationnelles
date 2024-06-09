import {
  CategoryResource,
  Share,
  StateTypeRelation,
  TypeRelation,
  TypeResource,
  User,
  Comment,
} from './index'

interface Resource {
  idResource: number
  title: string
  createdAt: { date: string; jour: string }
  content: string
  isFavorite: boolean
  isArchived: boolean
  isValidated: boolean
  isExploited: boolean
  isPrivate: boolean
  author: User
  authorId: number
  categoryResource: CategoryResource
  categoryResourceId: number
  typeResource: TypeResource
  typeResourceId: number
  typeRelation: TypeRelation[]
  stateTypeRelation: StateTypeRelation[]
  shares: Share[]
  comments: Comment[] //TODO: create Comment type
}

export default Resource
