import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';
import { makeFindAllsLogsWebhookService } from '@/services/factories/make-find-all-logs-webhook-service';

export async function findAllLogsWebhook(req: FastifyRequest, res: FastifyReply) {
  try {
    const findAllLogsWebhookService = makeFindAllsLogsWebhookService();
    const { logs } = await findAllLogsWebhookService.execute();
    return res.status(200).send({ logs });
  } catch (e) {
    if (e instanceof ResourceNotFoundError) {
      return res.status(404).send({ errors: e.message });
    }

    throw e;
  }
}
