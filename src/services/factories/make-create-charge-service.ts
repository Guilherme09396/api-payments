import { CreateChargeService } from '../charges/create-charge-service';
import { PrismaChargeRepository } from '@/repositories/prisma/prisma-charge-repository';

export function makeCreateChargeService() {
  const chargeRepository = new PrismaChargeRepository();
  const createChargeService = new CreateChargeService(chargeRepository);
  return createChargeService;
}
