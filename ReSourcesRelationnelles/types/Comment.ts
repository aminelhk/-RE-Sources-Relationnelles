interface Comment {
  idComment: string
  content: string
  createdAt: { date: string; jour: string }
  authorId: number
  resourceId: number
  parentId?: number
}

export default Comment
