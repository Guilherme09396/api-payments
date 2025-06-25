import { Charges } from 'generated/prisma';
import { ChargeRepository } from '@/repositories/Charge-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface FindByIdChargeRequest {
    id: string
}

interface FindByIdChargeReponse {
  charge: Charges
}

export class FindByIdChargeService {
  constructor(private chargeRepository: ChargeRepository) {}

  async execute({
    id,
  }: FindByIdChargeRequest): Promise<FindByIdChargeReponse> {
    const charge = await this.chargeRepository.findById(id);

    if (!charge) {
      throw new ResourceNotFoundError();
    }

    return { charge };
  }
}
