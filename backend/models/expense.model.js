import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


 const Expense = sequelize.define('Expense', {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  });
  
export default Expense;

