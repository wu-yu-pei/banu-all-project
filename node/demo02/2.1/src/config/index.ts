export default {
  mysql: {
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'test_news',
  },
  redisConfig: {
    port: 6379,
    host: '127.0.0.1',
    password: '123456',
    db: 1,
  },
  scheduler:{
    name:'updateMysqlNewsViewsFromRedis',
    time:'10 * * * * *'
  }
};
