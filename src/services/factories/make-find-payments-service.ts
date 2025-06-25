import { PrismaPaymentRepository } from '@/repositories/prisma/prisma-payment-repository';
import { FindPaymentsService } from '../payments/find-payments-service';

export function makeFindPaymentsService() {
  const paymentRepository = new PrismaPaymentRepository();
  const findPaymentsService = new FindPaymentsService(paymentRepository);

  return findPaymentsService;
}
