import Express from 'express';
import ShipmentsController from '../controllers/shipments.controller';

const router = Express.Router();

router.get('/', ShipmentsController.getAll); 
router.get('/id/:id', ShipmentsController.getById);

router.post('/', ShipmentsController.create); 

export default router;