import Router from 'express-promise-router';
import { login, logout, profile, register } from '../controllers/auth.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import { validateSchema } from '../middlewares/validate.middleware.js';
import {loginSchema, registerSchema} from '../schemas/auth.schema.js';

const router = Router();

router.post('/login', validateSchema(loginSchema), login);

router.post('/register', validateSchema(registerSchema), register);

router.post('/logout', logout);

router.get('/profile', isAuth, profile);

export default router;