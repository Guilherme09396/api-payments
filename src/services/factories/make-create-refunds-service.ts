import { PrismaChargeRepository } from '@/repositories/prisma/prisma-charge-repository';
import { CreateRefundsService } from '../refunds/create-refunds-service';
import { PrismaPaymentRepository } from '@/repositories/prisma/prisma-payment-repository';

export function makeCreateRefundsService() {
  const chargeRepository = new PrismaChargeRepository();
  const paymentRepository = new PrismaPaymentRepository();
  const createRefundsService = new CreateRefundsService(chargeRepository, paymentRepository);
  return createRefundsService;
}
