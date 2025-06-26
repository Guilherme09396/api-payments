import { Prisma, logsWebhook } from 'generated/prisma';
import { randomUUID } from 'node:crypto';
import { LogWebhookRepository } from '../Log-webhook-repository';

export class InMemoryLogWebhookRepository implements LogWebhookRepository {
  private data: logsWebhook[] = [];

  async findByChargeId(chargeId: string): Promise<logsWebhook | null> {
    const log = this.data.find((item) => item.charge_id === chargeId);
    if (!log) {
      return null;
    }

    return log;
  }

  async create(data: Prisma.logsWebhookUncheckedCreateInput): Promise<logsWebhook> {
    this.data.push({
      id: randomUUID(),
      created_at: new Date(),
      charge_id: data.charge_id,
      event: data.event,
    });

    return this.data[this.data.length - 1];
  }

  async findAll(): Promise<logsWebhook[]> {
    return this.data;
  }
}
