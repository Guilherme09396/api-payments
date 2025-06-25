import { InMemoryChargesRepository } from '@/repositories/in-memory/in-memory-charges-repository';
import { FindByIdChargeService } from '../charges/find-by-id-charge-service';

export function makeFindByIdChargeService() {
  const chargeRepository = new InMemoryChargesRepository();
  const findByIdChargeService = new FindByIdChargeService(chargeRepository);
  return findByIdChargeService;
}
