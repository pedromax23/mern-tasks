import express from 'express';
import morgan from 'morgan';
import taskRoutes from './routes/tasks.routes.js';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { testConnection } from './db.js';
import { ORIGIN } from './config.js';

const app = express();

// Middlewares
app.use(cors({
    origin: ORIGIN, // Las direcciones que pueden pedir datos a esta api
    credentials: true // Por que se envian datos por cookies 
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.get('/', (req, res) => res.json({ message: "Welcome to my API" }));
app.get('/api/ping', async (req, res) => {
    await testConnection()
});
app.use('/api', taskRoutes)
app.use('/api', authRoutes)

// Error Handler
app.use((err, req, res, next) => {
    res.status(500).json({
        status: "error",
        message: err.message
    })
});

export default app;