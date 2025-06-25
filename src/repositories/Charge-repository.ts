import { Charges, Prisma } from 'generated/prisma';

export interface ChargeRepository {
    findById(id: string): Promise<Charges | null>
    create(data: Prisma.ChargesCreateInput): Promise<Charges>
    findAll(): Promise<Charges[]>
    updateStatusByPayment(chargeId: string, status: string): Promise<Charges>
}
