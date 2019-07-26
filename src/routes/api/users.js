import Router from 'express';
import userControls from '../../controllers/usersController';

const userRouter = Router();

userRouter.route('/')
	.get(userControls.findAll)
	.post(userControls.create);

userRouter.route('/email/:userEmail')
	.get(userControls.findByEmail);

userRouter.route('/username/:username')
	.get(userControls.findByUsername);

export default userRouter;