import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';
import OfficeController from './app/controllers/OfficeController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/office', OfficeController.index);
routes.post('/office', OfficeController.store);
routes.put('/office/:id', OfficeController.update);
routes.delete('/office/:id', OfficeController.delete);


export default routes;