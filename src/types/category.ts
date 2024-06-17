export interface ICategory {
  categoryId: number
  name: string
  slug: string
  createdAt: string
  deletedAt: string
}

export interface ICategoryDetail extends ICategory {
  createdBy: number
  updatedAt: string
  updatedBy: number
  deletedBy: number
}
