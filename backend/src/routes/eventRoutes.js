import express from 'express'
import { verifyToken } from '../middleware/authMiddleware.js';
import { fetchEvent, addEvent } from '../controllers/eventControllers.js';

const router = express.Router();

router.post("/", verifyToken, addEvent);
router.get('/', verifyToken, fetchEvent)

export default router;