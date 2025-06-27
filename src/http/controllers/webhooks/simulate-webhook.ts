import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';
import { NotFoundPaymentError } from '@/services/errors/not-found-payment-error';
import { makeSimulateWebhookService } from '@/services/factories/make-simulate-webhook-service';

export async function simulateWebhook(req: FastifyRequest, res: FastifyReply) {
  try {
    const simulateWebhookSchema = z.object({
      event: z.enum(['payment_success', 'payment_failed']),
      chargeId: z.string().uuid(),
    });

    const { event, chargeId } = simulateWebhookSchema.parse(req.body);

    const simulateWebhookService = makeSimulateWebhookService();
    const { charge } = await simulateWebhookService.execute({ event, chargeId });
    return res.status(201).send({ charge });
  } catch (e) {
    if (e instanceof ResourceNotFoundError) {
      return res.status(404).send({ errors: e.message });
    }

    throw e;
  }
}
