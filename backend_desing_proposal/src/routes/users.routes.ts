import Express from 'express';
import UsersController from '../controllers/users.controller';

const router = Express.Router();

router.get('/', UsersController.getAll);

export default router;