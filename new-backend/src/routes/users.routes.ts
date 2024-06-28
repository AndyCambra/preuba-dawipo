import Express from 'express';
import UsersController from '../controllers/users.controller';

const router =
  Express.Router();

//GET
router.get(
  '/',
  UsersController.getAll,
);
router.get(
  '/name/:name',
  UsersController.getByName,
);
router.get(
  '/id/:id',
  UsersController.getById,
);

//POST
router.post(
  '/register',
  UsersController.register,
);
router.post(
  '/login',
  UsersController.login,
);

//PUT
router.put(
  '/name/:name',
  UsersController.updateByName,
);
router.put(
  '/id/:id',
  UsersController.updateById,
);

//DELETE
router.delete(
  '/all',
  UsersController.deleteAll,
);
router.delete(
  '/name/:name',
  UsersController.deleteByName,
);
router.delete(
  '/id/:id',
  UsersController.deleteById,
);

export default router;
