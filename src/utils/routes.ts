import type { LazyRouteFunction, RouteObject } from 'react-router-dom'
import { DefaultErrorBoundaries } from '@components/ErrorBoundaries'

export const lazyWrap = (
  factory: () => Promise<any>,
  isLayout = false,
): LazyRouteFunction<RouteObject> => {
  return async () => {
    const page = await factory()
    return {
      Component: page.default || (isLayout ? page.Layout : page.Component),
      ErrorBoundary: page.ErrorBoundary || DefaultErrorBoundaries,
      loader: page.loader,
    }
  }
}
