import { Application } from '@tiejs/core'
import { UserController } from './user.controller'

const app = new Application({
  controllers: [UserController],
})

app.bootstrap()
