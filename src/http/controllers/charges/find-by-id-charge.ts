import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindByIdChargeService } from '@/services/factories/make-find-by-id-charge-service';

export async function findByIdCharge(req: FastifyRequest, res: FastifyReply) {
  const chargeSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = chargeSchema.parse(req.params);

  const findByIdChargeService = makeFindByIdChargeService();

  const { charge } = await findByIdChargeService.execute({ id });
  return res.status(200).send({ charge });
}
