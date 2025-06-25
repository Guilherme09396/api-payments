import { Prisma, Charges } from 'generated/prisma';
import { randomUUID } from 'node:crypto';
import { ChargeRepository } from '../Charge-repository';

export class InMemoryChargesRepository implements ChargeRepository {
  private data: Charges[] = [];

  async create({
    client, amount, description, status,
  }: Prisma.ChargesCreateInput): Promise<Charges> {
    this.data.push({
      id: randomUUID(),
      client,
      amount,
      description,
      status,
      created_at: new Date(),
    });

    return this.data[this.data.length - 1];
  }
}
