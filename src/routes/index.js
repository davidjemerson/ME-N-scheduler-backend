import { Router } from 'express';
import eventRouter from './events.js';
import userRouter from './users.js';

const router = Router();

router.get('/', (req, res) => {
	return res.send('Events can be found at /events. Users can be found at /users');
});

router.use('/events', eventRouter);
router.use('/users', userRouter);

export default router;