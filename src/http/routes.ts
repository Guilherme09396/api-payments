import { FastifyInstance } from 'fastify';
import { createCharge } from './controllers/charges/create-charges';
import { findByIdCharge } from './controllers/charges/find-by-id-charge';
import { findCharges } from './controllers/charges/find-charges';
import { createPayments } from './controllers/payments/create-payments';
import { findPayments } from './controllers/payments/find-payments';
import { createRefunds } from './controllers/refunds/create-refunds';

export function chargeRoutes(app: FastifyInstance) {
  app.post('/', createCharge);
  app.get('/:id', findByIdCharge);
  app.get('/', findCharges);
}

export function paymentsRoutes(app: FastifyInstance) {
  app.post('/', createPayments);
  app.get('/', findPayments);
}

export function refundsRoutes(app: FastifyInstance) {
  app.post('/:id', createRefunds);
}
