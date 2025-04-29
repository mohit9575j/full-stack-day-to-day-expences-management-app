// import express from 'express';
// import dotenv  from 'dotenv';
// import sequelize from './config/db.js';
// import authRoutes from './routes/auth.routes.js';

// dotenv.config();

// const app = express();

// app.use(express.json());

// const PORT = process.env.DB_PORT || 3000;

// app.use('/api/auth', authRoutes);

// const serverstart = async () => {
//     try {
//         await sequelize.authenticate();
//         await sequelize.sync();
//         console.log("✅ Database connected and models synced");

       
//     } catch (error) {
//         console.log(" Database connection error:", error);
//     }
// };

// serverstart();

// app.listen(PORT, () => {
//     console.log(` Server running on port ${PORT}`);
// });

 





import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Add a basic route for the root URL
app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});

app.use('/api/auth', authRoutes);

const serverstart = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
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

// Start the server
serverstart();