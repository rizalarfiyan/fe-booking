import type { LazyRouteFunction, RouteObject } from 'react-router-dom'

export const lazyWrap = (
  factory: () => Promise<any>,
  isLayout = false,
): LazyRouteFunction<RouteObject> => {
  return async () => {
    const page = await factory()
    return {
      Component: page.default || (isLayout ? page.Layout : page.Component),
      ErrorBoundary: page.ErrorBoundary,
      loader: page.loader,
    }
  }
}
