import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';
import { makeCreateRefundsService } from '@/services/factories/make-create-refunds-service';
import { NotFoundPaymentError } from '@/services/errors/not-found-payment-error';

export async function createRefunds(req: FastifyRequest, res: FastifyReply) {
  try {
    const createRefundsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = createRefundsSchema.parse(req.params);

    const createRefundsService = makeCreateRefundsService();
    const { charge } = await createRefundsService.execute({ chargeId: id });
    return res.status(201).send({ charge });
  } catch (e) {
    if (e instanceof ResourceNotFoundError || e instanceof NotFoundPaymentError) {
      return res.status(403).send({ errors: e.message });
    }

    throw e;
  }
}
