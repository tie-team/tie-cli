import { Application } from '@tiejs/core'
import { UserController } from './user/user.controller'
import { User } from './user/user.entity'

const app = new Application({
  typeorm: {
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'test',
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: ['./migration/**/*.ts'],
    subscribers: ['./subscriber/**/*.ts'],
    cli: {
      entitiesDir: './entity',
      migrationsDir: './migration',
      subscribersDir: './subscriber',
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  controllers: [UserController],
  plugins: [
    {
      name: 'typeorm',
      package: '@tiejs/typeorm',
      enable: true,
    },
  ],
})

app.bootstrap()
