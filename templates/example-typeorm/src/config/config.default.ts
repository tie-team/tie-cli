import { Injectable } from '@tiejs/common'

@Injectable()
export default class Config {
  typeorm = {
    type: 'mysql',
    host: '127.0.01',
    port: 3306,
    username: 'TODO',
    password: 'TODO',
    database: 'TODO',
    synchronize: false,
    logging: true,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  }
}
