import db from '../models/index.js';

const User = db.User;

const premiumMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

