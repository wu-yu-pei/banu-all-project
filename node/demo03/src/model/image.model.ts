import { DataTypes } from 'sequelize';
import { sequelize } from '../database/index';

const Image = sequelize.define(
  'images',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    news_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

Image.sync({ alter: true });

export default Image;
