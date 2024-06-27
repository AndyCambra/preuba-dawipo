import Express from 'express';
import ConnectorsController from '../controllers/connectors.controller';

const router = Express.Router();

router.get('/', ConnectorsController.getAll); 
router.get('/id/:id', ConnectorsController.getById);

router.post('/', ConnectorsController.create); 

export default router;
