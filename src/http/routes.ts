import { FastifyInstance } from 'fastify';
import { createCharge } from './controllers/charges/create-charges';

export function chargeRoutes(app: FastifyInstance) {
  app.get('/', createCharge);
}
