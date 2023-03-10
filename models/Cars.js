'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  Cars.init({
    name: DataTypes.STRING,
    tipemobil: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    deletedBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE

  }, {
    sequelize,
    modelName: 'Cars',
  });
  return Cars;
};