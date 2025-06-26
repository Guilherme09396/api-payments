import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';
import { makeFindAllsLogsWebhookService } from '@/services/factories/make-find-all-logs-webhook-service';

export async function findAllLogsWebhook(req: FastifyRequest, res: FastifyReply) {
  try {
    const findAllLogsWebhookService = makeFindAllsLogsWebhookService();
    const { logs } = await findAllLogsWebhookService.execute();
    return { logs };
  } catch (e) {
    if (e instanceof ResourceNotFoundError) {
      return res.status(403).send({ errors: e.message });
    }

    throw e;
  }
}
