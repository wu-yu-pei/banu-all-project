import { Sequelize } from 'sequelize';
import config from '../config';

const sequelize = new Sequelize({
  username: config.database.username,
  password: config.database.password,
  port: config.database.port,
  host: config.database.host,
  database: config.database.database,
  dialect: 'mysql',
});

export { sequelize };
