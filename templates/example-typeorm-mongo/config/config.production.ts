import { Injectable } from '@tiejs/common'

@Injectable()
export default class Config {
  typeorm = {
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'leaf',
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
