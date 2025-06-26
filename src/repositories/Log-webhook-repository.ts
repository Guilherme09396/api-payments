import { logsWebhook, Prisma } from 'generated/prisma';

export interface LogWebhookRepository {
    create(data: Prisma.logsWebhookUncheckedCreateInput): Promise<logsWebhook>
    findByChargeId(chargeId: string): Promise<logsWebhook | null>
    findAll(): Promise<logsWebhook[]>
}
