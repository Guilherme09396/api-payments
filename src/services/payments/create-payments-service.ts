import { Payments } from 'generated/prisma';
import { PaymentRepository } from '@/repositories/Payment-repository';
import { ChargeRepository } from '@/repositories/Charge-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { AlreadyExistsPaymentError } from '../errors/already-exists-payment-error';

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

    const paymentHasExist = await this.paymentRepository.findByChargeId(chargesId);

    if (paymentHasExist) {
      throw new AlreadyExistsPaymentError();
    }

    if (status === 'success') {
      this.chargeRepository.updateOneCharge({ status: 'paid' }, chargesId);
    } else {
      this.chargeRepository.updateOneCharge({ status: 'failed' }, chargesId);
    }

    const payment = await this.paymentRepository.create({
      method,
      status,
      charges_id: chargesId,
    });

    return { payment };
  }
}
