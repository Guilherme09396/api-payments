import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';
import { makeFindPaymentsService } from '@/services/factories/make-find-payments-service';

export async function findPayments(req: FastifyRequest, res: FastifyReply) {
  try {
    const findPaymentsService = makeFindPaymentsService();
    const { payments } = await findPaymentsService.execute();
    return res.status(200).send({ payments });
  } catch (e) {
    if (e instanceof ResourceNotFoundError) {
      return res.status(404).send({ errors: e.message });
    }

    throw e;
  }
}
