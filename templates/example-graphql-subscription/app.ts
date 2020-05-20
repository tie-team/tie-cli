import { Appliaction } from '@tiejs/core'
import { MessageResolver } from './message.resolver'

const app = new Appliaction({
  resolvers: [MessageResolver],
})

app.bootstrap()
