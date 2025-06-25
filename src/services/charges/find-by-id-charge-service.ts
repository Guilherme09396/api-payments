import { Charges } from 'generated/prisma';
import { ChargeRepository } from '@/repositories/Charge-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface CreateChargeRequest {
    id: string
}

interface CreateChargeReponse {
  charge: Charges
}

export class FindByIdChargeService {
  constructor(private chargeRepository: ChargeRepository) {}

  async execute({
    id,
  }: CreateChargeRequest): Promise<CreateChargeReponse> {
    const charge = await this.chargeRepository.findById(id);

    if (!charge) {
      throw new ResourceNotFoundError();
    }

    return { charge };
  }
}
