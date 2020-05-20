import { Appliaction } from '@tiejs/core'
import { HomeController } from './home.controller'

const app = new Appliaction({
  controllers: [HomeController],
})

app.bootstrap()
