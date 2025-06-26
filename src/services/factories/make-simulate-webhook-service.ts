import { PrismaChargeRepository } from '@/repositories/prisma/prisma-charge-repository';
import { SimulateWebhookService } from '../webhook/simulate-webhook-service';

export function makeSimulateWebhookService() {
  const chargeRepository = new PrismaChargeRepository();
  const logWebhookRepository;
  const simulateWebhookService = new SimulateWebhookService(chargeRepository);
  return simulateWebhookService;
}
