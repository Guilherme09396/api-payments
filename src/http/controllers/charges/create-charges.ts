import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeCreateChargeService } from '@/services/factories/make-create-charge-service';

export async function createCharge(req: FastifyRequest, res: FastifyReply) {
  const chargeSchema = z.object({
    client: z.string(),
    amount: z.number(),
    description: z.string(),
    status: z.enum(['pending', 'paid', 'failed', 'refunded']).default('pending'),
  });

  const {
    client, amount, description, status,
  } = chargeSchema.parse(req.body);

  const createChargeService = makeCreateChargeService();
  await createChargeService.execute({
    client, amount, description, status,
  });

  return res.status(201).send();
}
