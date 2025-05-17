 import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import expenseRoutes from './routes/expense.routes.js';
import premiumRoutes from './routes/premium.routes.js';
import leadRoutes from './routes/lead.routes.js';


dotenv.config();

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Health check endpoint for root URL
app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});

// Authentication-related endpoints
app.use('/api/auth', authRoutes);

// Expense tracking-related endpoints
app.use('/api/expenses', expenseRoutes);

// Premium subscription-related endpoints
app.use('/api/premium', premiumRoutes);

// Leaderboard endpoint (under premium as well)
app.use('/api/premium', leadRoutes);


const serverstart = async () => {
    try {
        // Test database connection
        await sequelize.authenticate();

        // Synchronize models with DB (alter mode)
        await sequelize.sync({ alter: true });

        console.log(" Database connected and models synced");

        // Start listening for HTTP requests
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(" Database connection error:", error);
        process.exit(1); // Exit process with failure
    }
};


// Initialize the application
serverstart();

