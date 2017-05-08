/* @flow */
import { Route, Switch } from 'react-router'

import CreatorContainer from 'containers/CreatorContainer'
import PrintContainer from 'containers/PrintContainer'

type RouteDefinition = {
  component: ReactClass<*>,
  path: string,
  exact?: boolean,
}

const defs: { [string]: RouteDefinition } = {
  'document#edit': {
    component: CreatorContainer,
    path: '/',
    exact: true,
  },
  'document#show': {
    component: PrintContainer,
    path: '/print',
  },
}

export function getPathFromKey (key: $Keys<typeof defs>): string {
  const route = defs[key]
  if (route == null) {
    throw new Error()
  }
  return route.path
}

export default (
  <Switch>
    { Object.keys(defs).map(key => (<Route key={key} {...defs[key]} />)) }
  </Switch>
)