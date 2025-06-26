import { Charges } from 'generated/prisma';
import { ChargeRepository } from '@/repositories/Charge-repository';
import { PaymentRepository } from '@/repositories/Payment-repository';
import { NotFoundPaymentError } from '../errors/not-found-payment-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface SimulateWebhookRequest {
    event: string
    chargeId: string
}

interface SimulateWebhookResponse {
    charge: Charges
}

export class SimulateWebhookService {
  constructor(
    private chargeRepository: ChargeRepository,
    private paymentRepository: PaymentRepository,
  ) {}

  async execute({ event, chargeId }: SimulateWebhookRequest): Promise<SimulateWebhookResponse> {
    const charge = await this.chargeRepository.findById(chargeId);
    let status;

    if (!charge) {
      throw new ResourceNotFoundError();
    }

    if (event === 'payment_success') {
      status = 'paid';
    } else if (event === 'payment_failed') {
      status = 'failed';
    } else {
      throw new ResourceNotFoundError();
    }

    const chargeUpdated = await this.chargeRepository.updateOneCharge({ status }, chargeId);
    return { charge: chargeUpdated };
  }
}
