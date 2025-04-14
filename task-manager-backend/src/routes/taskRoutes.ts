import express from 'express';
import { suggestPriority } from '../controllers/taskController';

const router = express.Router();

router.post('/suggest-priority', suggestPriority);

export default router;
