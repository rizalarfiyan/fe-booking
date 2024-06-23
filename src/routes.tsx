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
          {
            path: 'about',
            lazy: lazyWrap(() => import('@pages/About')),
          },
          {
            path: 'books',
            lazy: lazyWrap(() => import('@pages/Books')),
          },
          {
            path: 'book/:slug',
            lazy: lazyWrap(() => import('@pages/Book')),
          },
          {
            path: 'guide-and-rules',
            lazy: lazyWrap(() => import('@pages/GuideAndRules')),
          },
        ],
      },
      {
        path: '/',
        lazy: lazyWrap(() => import('@layouts/AuthGuard'), true),
        children: [
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
        ],
      },
      {
        path: 'dashboard',
        lazy: lazyWrap(() => import('@layouts/Dashboard'), true),
        children: [
          {
            index: true,
            lazy: lazyWrap(() => import('@pages/dashboard/Dashboard')),
          },
          {
            path: 'leaderboard',
            lazy: lazyWrap(() => import('@pages/dashboard/Leaderboard')),
          },
          {
            path: 'contact',
            lazy: lazyWrap(() => import('@pages/dashboard/contact/Contact')),
          },
          {
            path: 'category',
            lazy: lazyWrap(() => import('@pages/dashboard/category/Category')),
          },
          {
            path: 'book',
            lazy: lazyWrap(() => import('@pages/dashboard/book/Book')),
          },
          {
            path: 'book/create',
            lazy: lazyWrap(() => import('@pages/dashboard/book/CreateBook')),
          },
          {
            path: 'book/edit/:id',
            lazy: lazyWrap(() => import('@pages/dashboard/book/EditBook')),
          },
        ],
      },
      {
        path: '*',
        lazy: lazyWrap(() => import('@pages/NotFound')),
      },
    ],
  },
])

export default router
