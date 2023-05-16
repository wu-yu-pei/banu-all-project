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

export { sequelize };
