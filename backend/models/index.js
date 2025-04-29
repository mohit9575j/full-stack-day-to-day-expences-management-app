// import {Sequelize, DataTypes}  from 'sequelize'
// import userModel from  './user.model.js'

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.User = userModel(Sequelize,DataTypes);

// export default db;




import { Sequelize } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js';

const db = {
  sequelize,
  Sequelize,
  User
};

// For Sequelize operators like Op.gt
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;