import { Prisma, Payments } from 'generated/prisma';
import { PaymentRepository } from '../Payment-repository';
import { prisma } from '@/lib/prisma/index';

export class PrismaPaymentRepository implements PaymentRepository {
  async findByChargeId(chargeId: string): Promise<Payments | null> {
    const payment = await prisma.payments.findFirst({
      where: { charges_id: chargeId },
    });

    return payment;
  }

  async findAll(): Promise<Payments[]> {
    const payments = await prisma.payments.findMany();
    return payments;
  }

  async create(data: Prisma.PaymentsUncheckedCreateInput): Promise<Payments> {
    const payment = await prisma.payments.create({
      data,
    });

    return payment;
  }
}
