import Express from 'express';
import ConnectorsController from '../controllers/connectors.controller';

const router =
  Express.Router();

router.get(
  '/',
  ConnectorsController.getAll,
);
router.get(
  '/name/:name',
  ConnectorsController.getByName,
);
router.get(
  '/id/:id',
  ConnectorsController.getById,
);

router.post(
  '/',
  ConnectorsController.create,
);

router.put(
  '/name/:name',
  ConnectorsController.updateByName,
);
router.put(
  '/id/:id',
  ConnectorsController.updateById,
);
router.delete(
  '/all',
  ConnectorsController.deleteAll,
);

router.delete(
  '/name/:name',
  ConnectorsController.deleteByName,
);
router.delete(
  '/id/:id',
  ConnectorsController.deleteById,
);

export default router;
