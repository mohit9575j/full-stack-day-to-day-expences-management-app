import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT token sent in Authorization header.
 * Checks if token is present and well-formed.
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Validate presence of Authorization header and correct Bearer format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing or malformed" });
  }

  // Extract token from header ("Bearer <token>")
  const token = authHeader.split(" ")[1];

    try {
    // Verify token using secret key; throws error if invalid/expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded token payload (e.g. { id: user.id }) to request object
    req.user = decoded;

    // Proceed to next middleware or route handler
    next();
  } 

  
