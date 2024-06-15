export interface ISlugTitle {
  slug: string
  title: string
}

export interface ILabelValue<V = string, L = string> {
  value: V
  label: L
}

export interface IBaseResponse<T = any> {
  data: T
  message: string
  status: number
}

export interface ResponseList<T = any> {
  content: T
  metadata: ResponseMetadata
}

export interface ResponseMetadata {
  total: number
  page: number
  perPage: number
  totalPage: number
}

export type IBaseResponseList<T = any> = IBaseResponse<ResponseList<T[]>>
