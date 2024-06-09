import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import ReactHook from 'alova/react'
import { ErrorAuthorization, ErrorValidation } from '@libs/exceptions'

const alova = createAlova({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  statesHook: ReactHook,
  requestAdapter: GlobalFetch(),
  beforeRequest(method) {
    method.config.headers.Authorization = `Bearer ${localStorage.getItem(
      'access_token',
    )}`
  },
  responded: async (response) => {
    const res = await response.json()
    const code = res.code || response.status
    const { message, data } = res

    if (code === 401) {
      throw new ErrorAuthorization(message, code)
    }

    if (code === 400) {
      throw new ErrorValidation(message, data ?? {}, code)
    }

    if (!(code >= 200 && code <= 299)) {
      throw new Error(message)
    }

    return res
  },
})

export default alova
