import { Charges } from 'generated/prisma';
import { ChargeRepository } from '@/repositories/Charge-repository';

interface CreateChargeRequest {
    client: string
    amount: number
    description: string
    status: string
}

interface CreateChargeReponse {
  charge: Charges
}

export class CreateChargeService {
  constructor(private chargeRepository: ChargeRepository) {}

  async execute({
    client, amount, description, status,
  }: CreateChargeRequest): Promise<CreateChargeReponse> {
    const charge = await this.chargeRepository.create({
      client,
      amount,
      description,
      status,
    });

    return { charge };
  }
}
