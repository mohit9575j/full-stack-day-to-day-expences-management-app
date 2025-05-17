 import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());
