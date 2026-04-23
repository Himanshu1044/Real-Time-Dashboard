import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'
import db from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import bodyParser from 'body-parser';
import testRoutes from "./routes/testRoutes.js";
import eventRoutes from './routes/eventRoutes.js'

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve frontend
app.use(express.static(path.join(__dirname, '../../frontend/views')));
// console.log(path.join(__dirname, '../../frontend/views'))

// routes
app.use('/api/auth', authRoutes)
app.use('/api/test', testRoutes)
app.use('/api/events', eventRoutes)

export default app;