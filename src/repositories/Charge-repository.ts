import { Charges, Prisma } from 'generated/prisma';

export interface ChargeRepository {
    create(data: Prisma.ChargesCreateInput): Promise<Charges>
}
