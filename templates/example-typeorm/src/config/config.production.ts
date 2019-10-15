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
    entities: ['build/**/*.entity.ts'],
    migrations: ['build/migration/**/*.ts'],
    subscribers: ['build/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'build/entity',
      migrationsDir: 'build/migration',
      subscribersDir: 'build/subscriber',
    },
  }
}
