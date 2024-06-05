import {
  CategoryResource,
  Share,
  StateTypeRelation,
  TypeRelation,
  TypeResource,
  User,
} from './index'

interface Resource {
  idResource: number
  title: string
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
  comments: any[] //TODO: create Comment type
}

export default Resource
