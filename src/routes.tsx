import { lazyWrap } from '@utils/routes'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    lazy: lazyWrap(() => import('@layouts/Public'), true),
    children: [
      {
        index: true,
        lazy: lazyWrap(() => import('@pages/Home')),
      },
    ],
  },
  {
    path: 'login',
    lazy: lazyWrap(() => import('@pages/auth/Login')),
  },
  {
    path: 'register',
    lazy: lazyWrap(() => import('@pages/auth/Register')),
  },
  {
    path: '*',
    lazy: lazyWrap(() => import('@pages/NotFound')),
  },
])

export default router
