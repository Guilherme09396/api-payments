import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindByIdChargeService } from '@/services/factories/make-find-by-id-charge-service';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';

export async function findByIdCharge(req: FastifyRequest, res: FastifyReply) {
  try {
    const chargeSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = chargeSchema.parse(req.params);

    const findByIdChargeService = makeFindByIdChargeService();

    const { charge } = await findByIdChargeService.execute({ id });
    return res.status(200).send({ charge });
  } catch (e) {
    if (e instanceof ResourceNotFoundError) {
      return res.status(404).send(e.message);
    }

    throw e;
  }
}
