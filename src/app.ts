import { fastify } from 'fastify';
import { chargeRoutes } from './http/routes';

export const app = fastify();

app.register(chargeRoutes, {
  prefix: 'charges',
});
