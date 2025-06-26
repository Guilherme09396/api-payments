import { PrismaLogWebhookRepository } from '@/repositories/prisma/prisma-log-webhook-repository';
import { FindAllLogsWebhookService } from '../webhook/find-all-logs-webhook-service';

export function makeFindAllsLogsWebhookService() {
  const logWebhookRepository = new PrismaLogWebhookRepository();
  const findAllLogsWebhookService = new FindAllLogsWebhookService(logWebhookRepository);
  return findAllLogsWebhookService;
}
