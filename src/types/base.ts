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
