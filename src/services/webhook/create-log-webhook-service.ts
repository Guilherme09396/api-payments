import { logsWebhook } from 'generated/prisma';
import { ChargeRepository } from '@/repositories/Charge-repository';
import { LogWebhookRepository } from '@/repositories/Log-webhook-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface LogWebhookRequest {
    event: string
    chargeId: string
}

interface LogWebhookResponse {
    logWebhook: logsWebhook
}

export class CreateLogWebhookService {
  constructor(
    private chargeRepository: ChargeRepository,
    private logWebhookRepository: LogWebhookRepository,
  ) {}

  async execute({ event, chargeId }: LogWebhookRequest): Promise<LogWebhookResponse> {
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

    const logWebhook = await this.logWebhookRepository.create({
      event,
      charge_id: chargeId,
    });
    return { logWebhook };
  }
}
