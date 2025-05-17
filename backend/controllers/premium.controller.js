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

            // Prepare data for Cashfree API
        const orderData = {
            order_id: orderId,
            order_amount: orderAmount,
            order_currency: 'INR',
            order_note: 'Premium Membership Purchase',
            customer_details: {
                customer_id: userId.toString(),
                customer_name: user.name,
                customer_email: user.email,
                customer_phone: req.body.phoneNumber || ''
            },
            order_meta: {
                return_url: req.body.returnUrl ? `${req.body.returnUrl}?order_id={order_id}` : 'http://localhost:4000?order_id={order_id}',
                notify_url: req.body.notifyUrl || ''
            }
        };
        
        console.log("Sending to Cashfree:", JSON.stringify(orderData));

        // Call Cashfree API to create order
        const response = await axios.post(process.env.CASHFREE_API_URL, orderData, {
            headers: {
                'x-api-version': '2022-09-01',
                'x-client-id': process.env.CASHFREE_APP_ID,
                'x-client-secret': process.env.CASHFREE_SECRET_KEY,
                'Content-Type': 'application/json'
            }
        });

                return res.status(200).json({
            success: true,
            message: "Order created successfully",
            orderId: orderId,
            order: orderCreated,
            cashfreeOrderData: response.data
        });
    } catch (error) {
        console.error("Error creating order:", error.response?.data || error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to create order", 
            error: error.message 
        });
    }
};

// Verify payment and update order status
export const verifyPayment = async (req, res) => {
    try {
        const { orderId } = req.body;
        
        const order = await Order.findOne({ where: { orderId } });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const response = await axios.get(`${process.env.CASHFREE_API_URL}/${orderId}`, {
            headers: {
                'x-api-version': '2022-09-01',
                'x-client-id': process.env.CASHFREE_APP_ID,
                'x-client-secret': process.env.CASHFREE_SECRET_KEY,
                'Content-Type': 'application/json'
            }
        });

        const { order_status, cf_payment_id } = response.data;
        order.paymentId = cf_payment_id || null;

        if (order_status === 'PAID') {
            order.orderStatus = 'SUCCESSFUL';
            const user = await User.findByPk(order.UserId);
            if (user) {
                user.isPremium = true;
                await user.save();
            }
            await order.save();
            return res.status(200).json({
                success: true,
                message: "Payment successful and premium status activated",
                isPremium: true
            });
        } else if (order_status === 'EXPIRED' || order_status === 'CANCELLED') {
            order.orderStatus = 'FAILED';
            await order.save();
            return res.status(400).json({
                success: false,
                message: "Payment failed or cancelled",
                isPremium: false
            });
        } else {
            return res.status(202).json({
                success: false,
                message: "Payment status is pending or unknown",
                status: order_status
            });
        }
    } catch (error) {
        console.error("Error verifying payment:", error.response?.data || error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to verify payment", 
            error: error.message 
        });
    }
};


