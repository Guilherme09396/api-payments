import { Charges, Prisma } from 'generated/prisma';
import { ChargeRepository } from '../Charge-repository';
import { prisma } from '@/lib/prisma/index';

export class PrismaChargeRepository implements ChargeRepository {
  async updateOneCharge(data: Prisma.ChargesUpdateInput, chargeId: string): Promise<Charges> {
    const charge = await prisma.charges.update({
      where: { id: chargeId },
      data,
    });

    return charge;
  }

  async findById(id: string): Promise<Charges | null> {
    const charge = await prisma.charges.findUnique({
      where: { id },
    });

    return charge;
  }

  async create(data: Prisma.ChargesCreateInput): Promise<Charges> {
    const charge = await prisma.charges.create({
      data,
    });

    return charge;
  }

  async findAll(): Promise<Charges[]> {
    const charges = await prisma.charges.findMany();
    return charges;
  }
}
