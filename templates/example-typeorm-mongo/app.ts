import { Appliaction } from '@tiejs/core'
import { UserController } from './user/user.controller'

const app = new Appliaction({
  controllers: [UserController],
})

app.bootstrap()
