import Express from 'express';
import ConnectorsController from '../controllers/connectors.controller';

const router = Express.Router();

router.get('/name/:name', ConnectorsController.getByName);
router.get('/id/:id', ConnectorsController.getById); 
router.get('/', ConnectorsController.getAll); 

router.post('/', ConnectorsController.create); 

router.put('/:name', ConnectorsController.updateByName); 

router.delete('/:name', ConnectorsController.deleteByName);

export default router;
