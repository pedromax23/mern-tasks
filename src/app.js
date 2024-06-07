import express from 'express';
import morgan from 'morgan';
import taskRoutes from './routes/tasks.routes.js';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { testConnection } from './db.js';
import { ORIGIN } from './config.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Definir __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors({
    origin: ORIGIN, // Las direcciones que pueden pedir datos a esta API
    credentials: true // Porque se envían datos por cookies
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas de la API
app.get('/api/ping', async (req, res) => {
    await testConnection();
    res.json({ message: 'pong' });
});
app.use('/api', taskRoutes);
app.use('/api', authRoutes);

// Servir archivos estáticos del directorio "frontend/build"
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// Capturar todas las demás rutas y devolver index.html
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// Manejador de errores
app.use((err, req, res, next) => {
    res.status(500).json({
        status: "error",
        message: err.message
    });
});

export default app;
