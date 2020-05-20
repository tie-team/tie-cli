import { Appliaction } from '@tiejs/core'
import { HelloResolver } from './hello.resolver'

const app = new Appliaction({
  resolvers: [HelloResolver],
})

app.bootstrap()
