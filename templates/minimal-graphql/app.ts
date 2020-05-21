import { Application } from '@tiejs/core'
import { HelloResolver } from './hello.resolver'

const app = new Application({
  resolvers: [HelloResolver],
})

app.bootstrap()
