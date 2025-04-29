import express from 'express';
import { register, login, resetPasswordRequest, setNewPassword } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/register', register);

router.post('/login', login);

router.post('/reset-password-request', resetPasswordRequest);

router.post('/reset-password', setNewPassword);

export default router;
