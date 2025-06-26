import { logsWebhook, Prisma } from 'generated/prisma';

export interface LogWebhookRepository {
    create(data: Prisma.logsWebhookUncheckedCreateInput): Promise<logsWebhook>
    findAll(): Promise<logsWebhook[]>
}
