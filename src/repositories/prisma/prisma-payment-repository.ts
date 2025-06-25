import { Prisma, Payments } from 'generated/prisma';
import { PaymentRepository } from '../Payment-repository';

export class PrismaPaymentRepository implements PaymentRepository {
  create(data: Prisma.PaymentsUncheckedCreateInput): Promise<Payments> {
    throw new Error('Method not implemented.');
  }
}
