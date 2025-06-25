import { Payments } from 'generated/prisma';
import { PaymentRepository } from '@/repositories/Payment-repository';
import { ChargeRepository } from '@/repositories/Charge-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface CreatePaymentRequest {
    method: string
    status: string
    chargesId: string
}

interface CreatePaymentResponse {
    payment: Payments
}

export class CreatePaymentsService {
  constructor(
    private paymentRepository: PaymentRepository,
    private chargeRepository: ChargeRepository,
  ) {}

  async execute({ status, method, chargesId }: CreatePaymentRequest):
  Promise<CreatePaymentResponse> {
    const charge = await this.chargeRepository.findById(chargesId);

    if (!charge) {
      throw new ResourceNotFoundError();
    }

    const payment = await this.paymentRepository.create({
      method,
      status,
      charges_id: chargesId,
    });

    return { payment };
  }
}
