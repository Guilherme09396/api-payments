import {
  beforeEach, describe, expect, test,
} from 'vitest';
import { CreateChargeService } from './create-charge-service';
import { ChargeRepository } from '@/repositories/Charge-repository';
import { InMemoryChargesRepository } from '@/repositories/in-memory/in-memory-charges-repository';
import { FindByIdChargeService } from './find-by-id-charge-service';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

describe('serviço de buscar cobrança por id', () => {
  let chargeRepository: ChargeRepository;
  let sut: FindByIdChargeService;

  beforeEach(() => {
    chargeRepository = new InMemoryChargesRepository();
    sut = new FindByIdChargeService(chargeRepository);
  });

  test('é esperado recuperar uma cobrança pelo id', async () => {
    const { id } = await chargeRepository.create({
      client: 'Guilherme',
      amount: 1000,
      description: 'testando',
      status: 'pending',
    });

    const { charge } = await sut.execute({ id });
    expect(charge.id).toEqual(id);
  });

  test('é esperado não recuperar uma cobrança com id inexistente', async () => {
    await expect(sut.execute({ id: 'id-invalido' })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
