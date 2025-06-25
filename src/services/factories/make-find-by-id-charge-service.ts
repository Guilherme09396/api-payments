import { FindByIdChargeService } from '../charges/find-by-id-charge-service';
import { PrismaChargeRepository } from '@/repositories/prisma/prisma-charge-repository';

export function makeFindByIdChargeService() {
  const chargeRepository = new PrismaChargeRepository();
  const findByIdChargeService = new FindByIdChargeService(chargeRepository);
  return findByIdChargeService;
}
