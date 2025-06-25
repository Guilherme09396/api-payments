import { Prisma, Payments } from 'generated/prisma';
import { randomUUID } from 'node:crypto';
import { PaymentRepository } from '../Payment-repository';

export class InMemoryPaymentsRepository implements PaymentRepository {
  private data: Payments[] = [];

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
