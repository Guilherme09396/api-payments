import {
  beforeEach, describe, expect, test,
} from 'vitest';
import { CreateChargeService } from './create-charge-service';
import { ChargeRepository } from '@/repositories/Charge-repository';
import { InMemoryChargesRepository } from '@/repositories/in-memory/in-memory-charges-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { FindChargesService } from './find-charges-service';

describe('serviço de buscar todas as cobranças', () => {
  let chargeRepository: ChargeRepository;
  let sut: FindChargesService;

  beforeEach(() => {
    chargeRepository = new InMemoryChargesRepository();
    sut = new FindChargesService(chargeRepository);
  });

  test('é esperado recuperar todas as cobranças existentes', async () => {
    await chargeRepository.create({
      amount: 1000,
      client: 'Guilherme',
      description: 'teste',
      status: 'pending',
    });
    await chargeRepository.create({
      amount: 1000,
      client: 'Guilherme',
      description: 'teste1',
      status: 'pending',
    });
    const { charges } = await sut.execute();

    expect(charges.length).toBe(2);
    expect(charges[0].description).toBe('teste');
    expect(charges[1].description).toBe('teste1');
  });
});
