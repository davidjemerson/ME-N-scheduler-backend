import Router from 'express';
import eventControls from '../../controllers/eventsController';

const eventRouter = Router();

eventRouter.route('/')
	.get(eventControls.findAll)
	.post(eventControls.create);

eventRouter.route('/:id')
	.get(eventControls.findById);

eventRouter.route('/response/:id/:inviteId')
	.put(eventControls.addResponse);

export default eventRouter;