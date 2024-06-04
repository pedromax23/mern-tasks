import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => res.send('Ingresando'));

router.post('/register', (req, res) => res.send('Registrando'));

router.post('/logout', (req, res) => res.send('Deslogeando'));

router.get('/profile', (req, res) => res.send('Perfil'));

export default router;