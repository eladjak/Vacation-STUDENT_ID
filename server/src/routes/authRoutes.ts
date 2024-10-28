import express from 'express';
import { login, getUserDetails } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);
router.get('/me', getUserDetails);

export default router;
