import Express from 'express';
import ConnectorsController from '../controllers/connectors.controller';

const router = Express.Router();

router.get('/', ConnectorsController.getAll); 
router.get('/id/:id', ConnectorsController.getById);
router.get('/name/:name', ConnectorsController.getByName);

router.post('/', ConnectorsController.create); 

router.delete('/', ConnectorsController.deleteAll);
router.delete('/name/:name', ConnectorsController.deleteByName);
router.delete('/id/:id', ConnectorsController.deleteById);

router.put('/name/:name', ConnectorsController.updateByName);
router.put('/id/:id', ConnectorsController.updateById);

export default router;