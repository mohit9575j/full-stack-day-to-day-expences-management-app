 import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

 const Expense = sequelize.define('Expense', {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  
export default Expense;

