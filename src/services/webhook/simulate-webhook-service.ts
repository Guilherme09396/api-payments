import { Charges } from 'generated/prisma';
import { ChargeRepository } from '@/repositories/Charge-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { LogWebhookRepository } from '@/repositories/Log-webhook-repository';

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
    private logWebhookRepository: LogWebhookRepository,
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
    await this.logWebhookRepository.create({
      charge_id: chargeId,
      event,
    });
    return { charge: chargeUpdated };
  }
}
