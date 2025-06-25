import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeCreatePaymentsService } from '@/services/factories/make-create-payment-service';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';
import { AlreadyExistsPaymentError } from '@/services/errors/already-exists-payment-error';

export async function createPayments(req: FastifyRequest, res: FastifyReply) {
  try {
    const paymentSchmea = z.object({
      method: z.enum(['credit_card', 'pix']),
      status: z.enum(['success', 'failed']),
      chargesId: z.string().uuid(),
    });

    const { chargesId, method, status } = paymentSchmea.parse(req.body);

    const createPaymentService = makeCreatePaymentsService();
    await createPaymentService.execute({ chargesId, method, status });
    return res.status(201).send();
  } catch (e) {
    if (e instanceof ResourceNotFoundError || e instanceof AlreadyExistsPaymentError) {
      return res.status(403).send({ errors: e.message });
    }

    throw e;
  }
}
