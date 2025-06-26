import { logsWebhook } from 'generated/prisma';
import { LogWebhookRepository } from '@/repositories/Log-webhook-repository';

interface FindAllLogsWebhookResponse {
    logs: logsWebhook[]
}

export class FindAllLogsWebhookService {
  constructor(
    private logWebhookRepository: LogWebhookRepository,
  ) {}

  async execute(): Promise<FindAllLogsWebhookResponse> {
    const logs = await this.logWebhookRepository.findAll();
    return { logs };
  }
}
