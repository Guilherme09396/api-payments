import { Charges, Prisma } from 'generated/prisma';

export interface ChargeRepository {
    findById(id: string): Promise<Charges | null>
    create(data: Prisma.ChargesCreateInput): Promise<Charges>
    findAll(): Promise<Charges[]>
    updateOneCharge(data: Prisma.ChargesUpdateInput, chargeId: string): Promise<Charges>
}
