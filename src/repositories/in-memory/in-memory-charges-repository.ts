import { Prisma, Charges } from 'generated/prisma';
import { randomUUID } from 'node:crypto';
import { ChargeRepository } from '../Charge-repository';

export class InMemoryChargesRepository implements ChargeRepository {
  private data: Charges[] = [];

  async findAll(): Promise<Charges[]> {
    return this.data;
  }

  async findById(id: string): Promise<Charges | null> {
    const charge = this.data.find((item) => item.id === id);

    if (!charge) {
      return null;
    }

    return charge;
  }

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
