import { FindChargesService } from '../charges/find-charges-service';
import { PrismaChargeRepository } from '@/repositories/prisma/prisma-charge-repository';

export function makeFindChargesService() {
  const chargeRepository = new PrismaChargeRepository();
  const findChargesService = new FindChargesService(chargeRepository);
  return findChargesService;
}
