import { Application } from '@tiejs/core'
import { UserResolver } from './user.resolver'

const app = new Application({
  resolvers: [UserResolver],
})

app.bootstrap()
