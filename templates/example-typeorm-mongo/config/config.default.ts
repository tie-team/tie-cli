import { Injectable } from '@tiejs/common'

@Injectable()
export default class Config {
  typeorm = {
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'test',
    synchronize: true,
    logging: true,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
}
