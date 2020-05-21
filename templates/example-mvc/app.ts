import { Application } from '@tiejs/core'
import { HomeController } from './home.controller'

const app = new Application({
  controllers: [HomeController],
})

app.bootstrap()
