import { Sequelize } from 'sequelize';
import config from '../config';
import { Redis } from 'ioredis';

const sequelize = new Sequelize({
  username: config.mysql.username,
  password: config.mysql.password,
  port: config.mysql.port,
  host: config.mysql.host,
  database: config.mysql.database,
  dialect: 'mysql',
});

const redis = new Redis(config.redisConfig);

export default function () {
  sequelize
    .authenticate()
    .then(() => {
      console.log('数据库连接成功');
    })
    .catch((err) => {
      console.log('数据库连接失败', err);
    });
}

export { sequelize, redis };
