import { Payments, Prisma } from 'generated/prisma';

export interface PaymentRepository {
    findAll(): Promise<Payments[]>
    create(data: Prisma.PaymentsUncheckedCreateInput): Promise<Payments>
}
