 
import { Sequelize } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js';
import Expense from './expense.model.js';
import Order from './order.model.js';



const db = {
  sequelize,
  Sequelize,
  User,
  Expense
};

// For Sequelize operators like Op.gt
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
