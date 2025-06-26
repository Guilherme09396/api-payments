import { PrismaChargeRepository } from '@/repositories/prisma/prisma-charge-repository';
import { SimulateWebhookService } from '../webhook/simulate-webhook-service';
import { PrismaLogWebhookRepository } from '@/repositories/prisma/prisma-log-webhook-repository';

export function makeSimulateWebhookService() {
  const chargeRepository = new PrismaChargeRepository();
  const logWebhookRepository = new PrismaLogWebhookRepository();
  const simulateWebhookService = new SimulateWebhookService(chargeRepository, logWebhookRepository);
  return simulateWebhookService;
}
