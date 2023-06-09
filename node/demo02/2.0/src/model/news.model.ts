import { DataTypes } from 'sequelize';
import { sequelize } from '../database/index';

const News = sequelize.define(
  'news',
  {
    // 在这里定义模型属性
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    view: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: +new Date(),
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

News.sync({ alter: true });

export default News;
