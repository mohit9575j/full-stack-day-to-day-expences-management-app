
import express from 'express';
import dotenv from 'dotenv';
import cors  from 'cors';
import sequelize from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import expenseRoutes from './routes/expense.routes.js';
import premiumRoutes from './routes/premium.routes.js';
import leadRoutes from './routes/lead.routes.js';

dotenv.config();
           
const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 4000;

// Add a basic route for the root URL
app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/premium', premiumRoutes);
app.use('/api/premium' ,leadRoutes );

 
const serverstart = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log("✅ Database connected and models synced");
        
        // Start the server AFTER database connection is established
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(" Database connection error:", error);
        process.exit(1); // Exit with error code if DB connection fails
    }
};

// Start the servery
serverstart();