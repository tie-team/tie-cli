import { Appliaction } from '@tiejs/core'
import { UserResolver } from './user.resolver'

const app = new Appliaction({
  resolvers: [UserResolver],
})

app.bootstrap()
