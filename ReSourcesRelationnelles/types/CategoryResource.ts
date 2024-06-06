import { Resource } from './index'

interface CategoryResource {
  idCategoryResource: number
  labelCategoryResource: string
  resources: Resource[]
}

export default CategoryResource
