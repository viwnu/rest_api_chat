import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { ENTITES } from './entities';
import { MIGRATIONS } from './migrations';

dotenv.config({
  path: `.env.${process.env.NODE_ENV.trim()}`,
});

const Config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PS_HOST,
  port: Number(process.env.PS_PORT),
  username: process.env.PS_USER,
  password: process.env.PS_PASSWORD,
  database: process.env.PS_DB_NAME,
  entities: ENTITES,
  synchronize: Boolean(process.env.SYNC_DB === 'true') || false,
  migrations: MIGRATIONS,
};

export const AppDataSource: DataSource = new DataSource(Config);
