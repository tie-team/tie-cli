import { Appliaction } from '@tiejs/core'
import { UserController } from './user.controller'

const app = new Appliaction({
  controllers: [UserController],
})

app.bootstrap()
