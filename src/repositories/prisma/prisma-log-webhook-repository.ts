import { logsWebhook, Prisma } from 'generated/prisma';
import { prisma } from '@/lib/prisma/index';
import { LogWebhookRepository } from '../Log-webhook-repository';

export class PrismaLogWebhookRepository implements LogWebhookRepository {
  async create(data: Prisma.logsWebhookUncheckedCreateInput): Promise<logsWebhook> {
    const log = await prisma.logsWebhook.create({
      data,
    });
    return log;
  }

  async findByChargeId(chargeId: string): Promise<logsWebhook | null> {
    const log = await prisma.logsWebhook.findFirst({
      where: { charge_id: chargeId },
    });

    return log;
  }

  async findAll(): Promise<logsWebhook[]> {
    const logs = await prisma.logsWebhook.findMany();
    return logs;
  }
}
