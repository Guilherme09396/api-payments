import { fastify } from 'fastify';
import { ZodError } from 'zod';
import { chargeRoutes, paymentsRoutes } from './http/routes';
import { env } from './env';

export const app = fastify();

app.register(chargeRoutes, {
  prefix: 'charges',
});

app.register(paymentsRoutes, {
  prefix: 'payments',
});

app.setErrorHandler((err, req, res) => {
  if (err instanceof ZodError) {
    return res.status(400).send({ errors: 'Invalid format', issues: err.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err);
  }

  return res.status(500).send();
});
