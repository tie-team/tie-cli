import { Application } from '@tiejs/core'
import { UserController } from './user/user.controller'
import { User } from './user/user.entity'
import { UserResolver } from './user/user.resolver'

const app = new Application({
  typeorm: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'hello',
    synchronize: false,
    logging: true,
    entities: [User],
    migrations: ['./migration/**/*.ts'],
    subscribers: ['./subscriber/**/*.ts'],
    cli: {
      entitiesDir: './entity',
      migrationsDir: './migration',
      subscribersDir: './subscriber',
    },
  },
  controllers: [UserController],
  resolvers: [UserResolver], 
  plugins: [
    {
      name: 'typeorm',
      package: '@tiejs/typeorm',
      enable: true,
    },
  ],
})

app.bootstrap()
