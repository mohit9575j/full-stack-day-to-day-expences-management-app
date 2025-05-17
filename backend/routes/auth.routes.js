 import express from 'express';
import { register, login, resetPasswordRequest, setNewPassword } from '../controllers/auth.controller.js';

const router = express.Router();
