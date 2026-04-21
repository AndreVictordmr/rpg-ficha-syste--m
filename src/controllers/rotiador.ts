import { Router } from 'express';
import { SystemaBase } from '../controllers/systemaBase.js';

const routes = Router();


routes.post('/fichas', SystemaBase.criar);
routes.put('/fichas/:id', SystemaBase.editar);
routes.get('/fichas', SystemaBase.listarFichas)
routes.get('/fichas/:id', SystemaBase.buscarPorId);
routes.delete('/fichas/:id', SystemaBase.deletar);

export default routes;