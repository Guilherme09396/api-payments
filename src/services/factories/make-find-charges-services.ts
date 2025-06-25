import { InMemoryChargesRepository } from '@/repositories/in-memory/in-memory-charges-repository';
import { FindChargesService } from '../charges/find-charges-service';

export function makeFindChargesService() {
  const chargeRepository = new InMemoryChargesRepository();
  const findChargesService = new FindChargesService(chargeRepository);
  return findChargesService;
}
