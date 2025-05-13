import db from '../models/index.js';

const User = db.User;

const premiumMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (!user.isPremium) {
      return res.status(403).json({ 
        message: "Access denied. Premium membership required for this feature.",
        isPremium: false
      });
    }
    
    // User is premium, proceed to the next middleware/controller
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default premiumMiddleware;