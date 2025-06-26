import { Charges } from 'generated/prisma';
import { ChargeRepository } from '@/repositories/Charge-repository';
import { PaymentRepository } from '@/repositories/Payment-repository';
import { NotFoundPaymentError } from '../errors/not-found-payment-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface CreateRefundsRequest {
    chargeId: string
}

interface CreateRefundsResponse {
    charge: Charges
}

export class CreateRefundsService {
  constructor(
    private chargeRepository: ChargeRepository,
    private paymentRepository: PaymentRepository,
  ) {}

  async execute({ chargeId }: CreateRefundsRequest): Promise<CreateRefundsResponse> {
    const payment = await this.paymentRepository.findByChargeId(chargeId);
    const charge = await this.chargeRepository.findById(chargeId);

    if (!charge) {
      throw new ResourceNotFoundError();
    }

    if (!payment || charge.status !== 'paid') {
      throw new NotFoundPaymentError();
    }

    const chargeUpdated = await this.chargeRepository.updateOneCharge({ status: 'refunded' }, chargeId);
    return { charge: chargeUpdated };
  }
}
