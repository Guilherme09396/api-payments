import { fastify } from 'fastify';
import { ZodError } from 'zod';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'path';
import {
  chargeRoutes, docs, paymentsRoutes, refundsRoutes, simulateWebhookRoutes,
} from './http/routes';
import { env } from './env';

export const app = fastify();

app.register(fastifyCors, {
  origin: '*',
});

app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'static'), // Diretório onde os arquivos estáticos estão
});

app.register(chargeRoutes, {
  prefix: 'api/charges',
});

app.register(paymentsRoutes, {
  prefix: 'api/payments',
});

app.register(refundsRoutes, {
  prefix: 'api/refunds',
});

app.register(simulateWebhookRoutes, {
  prefix: 'api/webhook',
});

app.register(docs, {
  prefix: 'api/docs',
});

app.setErrorHandler((err, req, res) => {
  if (err instanceof ZodError) {
    return res.status(400).send({ errors: 'Invalid format', issues: err.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err);
  }

  return res.status(500).send({ errors: err.message });
});
