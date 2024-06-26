import Express from 'express';
import ShipmentsController from '../controllers/shipments.controller';

const router = Express.Router();

router.get('/', ShipmentsController.getAll);

export default router;