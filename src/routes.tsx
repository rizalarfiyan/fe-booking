import { lazyWrap } from '@utils/routes'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    lazy: lazyWrap(() => import('@layouts/App'), true),
    children: [
      {
        path: '/',
        lazy: lazyWrap(() => import('@layouts/Public'), true),
        children: [
          {
            index: true,
            lazy: lazyWrap(() => import('@pages/Home')),
          },
          {
            path: 'contact',
            lazy: lazyWrap(() => import('@pages/Contact')),
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
        path: 'forgot-password',
        lazy: lazyWrap(() => import('@pages/auth/ForgotPassword')),
      },
      {
        path: 'change-password',
        lazy: lazyWrap(() => import('@pages/auth/ChangePassword')),
      },
      {
        path: 'activation',
        lazy: lazyWrap(() => import('@pages/auth/Activation')),
      },
      {
        path: '*',
        lazy: lazyWrap(() => import('@pages/NotFound')),
      },
    ],
  },
])

export default router
