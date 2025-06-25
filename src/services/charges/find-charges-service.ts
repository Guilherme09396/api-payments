import { Charges } from 'generated/prisma';
import { ChargeRepository } from '@/repositories/Charge-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface FindChargesReponse {
  charges: Charges[]
}

export class FindChargesService {
  constructor(private chargeRepository: ChargeRepository) {}

  async execute(): Promise<FindChargesReponse> {
    const charges = await this.chargeRepository.findAll();
    return { charges };
  }
}
