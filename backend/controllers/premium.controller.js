import db from '../models/index.js';
import axios from 'axios';
import crypto from 'crypto';

const User = db.User;
const Order = db.Order;

// Create a new premium order
export const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        if(!userId) return res.status(500).json({message:`the user id which i want to know is ${userId}` });
         
        // Get user details
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if user is already premium
        if (user.isPremium) {
            return res.status(400).json({ message: "User is already a premium member" });
        }

        // Generate unique orderId
        const orderId = 'order_' + crypto.randomBytes(8).toString('hex');
        const orderAmount = process.env.PREMIUM_MEMBERSHIP_AMOUNT || 499;

            // Create order record in our database
        const orderCreated = await Order.create({
            orderAmount,
            orderCurrency: 'INR',
            orderStatus: 'PENDING',
            orderId,
            orderNote: 'Premium Membership Purchase',
            customerName: user.name,
            customerEmail: user.email,
            customerPhone: req.body.phoneNumber || '',  
            UserId: userId
        });
