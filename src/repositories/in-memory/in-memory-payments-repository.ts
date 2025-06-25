import { Prisma, Payments } from 'generated/prisma';
import { randomUUID } from 'node:crypto';
import { PaymentRepository } from '../Payment-repository';

export class InMemoryPaymentsRepository implements PaymentRepository {
  private data: Payments[] = [];

  async findByChargeId(chargeId: string): Promise<Payments | null> {
    const payment = this.data.find((item) => item.charges_id === chargeId);
    if (!payment) {
      return null;
    }

    return payment;
  }

  async findAll(): Promise<Payments[]> {
    return this.data;
  }

  async create({ method, status, charges_id }: Prisma.PaymentsUncheckedCreateInput)
  : Promise<Payments> {
    this.data.push({
      id: randomUUID(),
      method,
      status,
      charges_id,
      created_at: new Date(),
    });

    return this.data[this.data.length - 1];
  }
}
