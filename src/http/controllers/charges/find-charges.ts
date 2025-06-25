import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindChargesService } from '@/services/factories/make-find-charges-services';

export async function findCharges(req: FastifyRequest, res: FastifyReply) {
  const findChargesService = makeFindChargesService();

  const { charges } = await findChargesService.execute();
  return res.status(200).send({ charges });
}
