import {DataTypes} from 'sequelize';
import Sequelize from '../config/db.js' ;

export const user = Sequelize.define('User', {
     name: {
        type: DataTypes.STRING,
         allowNull: false,
    },
     email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {isEmail: true}
     },

     password: {
        type: DataTypes.STRING,
        allowNull: false,
     },

     resetToken: {
        type: DataTypes.STRING,
        allowNull: true,
     },
   
     resetTokenExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
     },

          isPremium: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
   }

})

export default user;

