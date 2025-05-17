 
import { Sequelize } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js';
import Expense from './expense.model.js';
import Order from './order.model.js';


 User.hasMany(Expense);     //  User ke pass multiple expenses
Expense.belongsTo(User); 

User.hasMany(Order);
Order.belongsTo(User);

// Associations (redundant but commonly used if modular structure is planned)
User.hasMany(Expense);
Expense.belongsTo(User);



const db = {
  sequelize,
  Sequelize,
  User,
  Expense,
  Order
};

// For Sequelize operators like Op.gt
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

