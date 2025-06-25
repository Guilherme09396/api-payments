import { Payments, Prisma } from 'generated/prisma';

export interface PaymentRepository {
    create(data: Prisma.PaymentsUncheckedCreateInput): Promise<Payments>
}
