import type React from 'react'
import { Suspense, lazy } from 'react'
import { Route, Switch } from 'wouter'

const Home = lazy(() => import('@pages/Home.tsx'))
const NotFound = lazy(() => import('@pages/NotFound.tsx'))

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path='/'>
        <Suspense fallback='Loading...'>
          <Home />
        </Suspense>
      </Route>
      <Route>
        <Suspense fallback='Loading...'>
          <NotFound />
        </Suspense>
      </Route>
    </Switch>
  )
}

export default Routes
