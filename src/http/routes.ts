import { FastifyInstance } from 'fastify';
import { createCharge } from './controllers/charges/create-charges';
import { findByIdCharge } from './controllers/charges/find-by-id-charge';
import { findCharges } from './controllers/charges/find-charges';

export function chargeRoutes(app: FastifyInstance) {
  app.post('/', createCharge);
  app.get('/:id', findByIdCharge);
  app.get('/', findCharges);
}
