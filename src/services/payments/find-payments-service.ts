import { Payments } from 'generated/prisma';
import { PaymentRepository } from '@/repositories/Payment-repository';
import { ChargeRepository } from '@/repositories/Charge-repository';

interface FindPaymentResponse {
    payments: Payments[]
}

export class FindPaymentsService {
  constructor(
    private paymentRepository: PaymentRepository,
    private chargeRepository: ChargeRepository,
  ) {}

  async execute():
  Promise<FindPaymentResponse> {
    const payments = await this.paymentRepository.findAll();
    return { payments };
  }
}
