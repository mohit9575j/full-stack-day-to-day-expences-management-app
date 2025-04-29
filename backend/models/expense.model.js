import {DataTypes} from 'seqeulize';
import sequelize from '../config/db';

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
       type : DataTypes.STRING,
       allowNull: false,
 }
})

export default Expense;