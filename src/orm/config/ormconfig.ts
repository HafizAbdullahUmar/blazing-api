// import { ConnectionOptions } from 'typeorm';

const config = {
  type: 'mongodb',
  name: 'default',
  host: process.env.MONGODB_HOST,
  port: Number(process.env.MONGODB_PORT),
  username: process.env.MONGODB_USER,
  password: process.env.MONGODB_PASSWORD,
  database: process.env.MONGODB_DB,
  synchronize: false,
  logging: false,
  useUnifiedTopology: true,
  entities: ['src/orm/entities/**/*.ts'],
  migrations: ['src/orm/migrations/**/*.ts'],
  subscribers: ['src/orm/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/orm/entities',
    migrationsDir: 'src/orm/migrations',
    subscribersDir: 'src/orm/subscriber',
  },
};

export default config;