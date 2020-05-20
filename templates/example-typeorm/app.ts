import { Appliaction } from '@tiejs/core'
import { UserController } from './user/user.controller'

const app = new Appliaction({
  typeorm: {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'hello',
    synchronize: false,
    logging: true,
    entities: ['./**/*.entity.ts'],
    migrations: ['./migration/**/*.ts'],
    subscribers: ['./subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'entity',
      migrationsDir: 'migration',
      subscribersDir: 'subscriber',
    },
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
