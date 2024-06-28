import Express from 'express';
import UsersController from '../controllers/users.controller';

const router =
  Express.Router();

router.get(
  '/',
  UsersController.getAll,
);
router.get(
  '/id/:id',
  UsersController.getById,
);

router.post(
  '/register',
  UsersController.register,
);

export default router;
