import { Application } from '@tiejs/core'
import { MessageResolver } from './message.resolver'

const app = new Application({
  resolvers: [MessageResolver],
})

app.bootstrap()
