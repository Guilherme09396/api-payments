import { InMemoryChargesRepository } from '@/repositories/in-memory/in-memory-charges-repository';
import { CreateChargeService } from '../charges/create-charge-service';

export function makeCreateChargeService() {
  const chargeRepository = new InMemoryChargesRepository();
  const createChargeService = new CreateChargeService(chargeRepository);
  return createChargeService;
}
