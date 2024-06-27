import Express from 'express';
import ShipmentsController from '../controllers/shipments.controller';

const router = Express.Router();

router.get('/name/:name', ShipmentsController.getByName);
router.get('/id/:id', ShipmentsController.getById); 
router.get('/', ShipmentsController.getAll); 

router.post('/', ShipmentsController.create); 

router.put('/:name', ShipmentsController.updateByName); 

router.delete('/:name', ShipmentsController.deleteByName);

export default router;