import express from 'express'
import cors from 'cors'
import db from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import bodyParser from 'body-parser';
import testRoutes from "./routes/testRoutes.js";
import eventRoutes from './routes/eventRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('api is running')
})

app.use('/api/auth', authRoutes)
app.use('/api/test', testRoutes)
app.use('/api/events', eventRoutes)

export default app;
