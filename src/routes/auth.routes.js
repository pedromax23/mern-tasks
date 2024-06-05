import Router from 'express-promise-router';
import { login, logout, profile, register } from '../controllers/auth.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', login);

router.post('/register', register);

router.post('/logout', logout);

router.get('/profile', isAuth, profile);

export default router;