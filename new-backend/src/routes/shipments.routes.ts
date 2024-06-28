import Express from 'express';
import ShipmentsController from '../controllers/shipments.controller';

const router =
  Express.Router();

//GET
router.get(
  '/',
  ShipmentsController.getAll,
);
router.get(
  '/name/:name',
  ShipmentsController.getByName,
);
router.get(
  '/trackingNumber/:trackingNumber',
  ShipmentsController.getByTrackingNumber,
);
router.get(
  '/id/:id',
  ShipmentsController.getById,
);

//POST
router.post(
  '/',
  ShipmentsController.create,
);

//PUT
router.put(
  '/name/:name',
  ShipmentsController.updateByName,
);
router.put(
  '/trackingNumber/:trackingNumber',
  ShipmentsController.updateByTrackingNumber,
);
router.put(
  '/id/:id',
  ShipmentsController.updateById,
);

//DELETE
router.delete(
  '/all',
  ShipmentsController.deleteAll,
);
router.delete(
  '/name/:name',
  ShipmentsController.deleteByName,
);
router.delete(
  '/trackingNumber/:trackingNumber',
  ShipmentsController.deleteByTrackingNumber,
);
router.delete(
  '/id/:id',
  ShipmentsController.deleteById,
);

export default router;
