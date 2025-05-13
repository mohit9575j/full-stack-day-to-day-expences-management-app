import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Order = sequelize.define('Order', {
  orderAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  orderCurrency: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'INR',
  },
  orderStatus: {
    type: DataTypes.ENUM('PENDING', 'SUCCESSFUL', 'FAILED'),
    allowNull: false,
    defaultValue: 'PENDING',
  },
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  paymentId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  orderNote: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Order;