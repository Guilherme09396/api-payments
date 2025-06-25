import { PrismaChargeRepository } from '@/repositories/prisma/prisma-charge-repository';
import { CreatePaymentsService } from '../payments/create-payments-service';
import { PrismaPaymentRepository } from '@/repositories/prisma/prisma-payment-repository';

export function makeCreatePaymentsService() {
  const chargeRepository = new PrismaChargeRepository();
  const paymentRepository = new PrismaPaymentRepository();
  const createPaymentService = new CreatePaymentsService(paymentRepository, chargeRepository);

  return createPaymentService;
}
