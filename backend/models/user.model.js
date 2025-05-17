import {DataTypes} from 'sequelize';
import Sequelize from '../config/db.js' ;

export const user = Sequelize.define('User', {
     name: {
        type: DataTypes.STRING,
         allowNull: false,
    },
