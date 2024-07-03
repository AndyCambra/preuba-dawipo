import Express from 'express';
import usersRouter from './users.routes';
import connectorsRouter from './connectors.routes';
import shipmentsRouter from './shipments.routes';

const mainRouter = Express.Router();

mainRouter.use('/users', usersRouter);
mainRouter.use('/connectors', connectorsRouter);
mainRouter.use('/shipments', shipmentsRouter);

export default mainRouter;
