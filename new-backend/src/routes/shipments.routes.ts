import Express from 'express';
import ShipmentsController from '../controllers/shipments.controller';

const router = Express.Router();

router.get('/', ShipmentsController.getAll); 
router.get('/name/:name', ShipmentsController.getByName);
router.get('/trackingNumber/:trackingNumber', ShipmentsController.getByTrackingNumber);
router.get('/id/:id', ShipmentsController.getById);

router.post('/', ShipmentsController.create); 

router.put('/name/:name', ShipmentsController.updateByName);
router.put('/trackingNumber/:trackingNumber', ShipmentsController.updateByTrackingNumber);
router.put('/id/:id', ShipmentsController.updateById); 
router.delete('/all', ShipmentsController.deleteAll);

router.delete('/name/:name', ShipmentsController.deleteByName);
router.delete('/trackingNumber/:trackingNumber', ShipmentsController.deleteByTrackingNumber);
router.delete('/id/:id', ShipmentsController.deleteById);

export default router;

