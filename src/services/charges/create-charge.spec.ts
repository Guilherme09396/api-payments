import {
  beforeEach, describe, expect, test,
} from 'vitest';
import { CreateChargeService } from './create-charge-service';
import { ChargeRepository } from '@/repositories/Charge-repository';
import { InMemoryChargesRepository } from '@/repositories/in-memory/in-memory-charges-repository';

describe('serviço de cobranças', () => {
  let chargeRepository: ChargeRepository;
  let sut: CreateChargeService;

  beforeEach(() => {
    chargeRepository = new InMemoryChargesRepository();
    sut = new CreateChargeService(chargeRepository);
  });

  test('é esperado criar uma cobrança', async () => {
    const chargeCreate = {
      client: 'test',
      amount: 1000,
      description: 'testando',
      status: 'pending',
    };

    const { charge } = await sut.execute(chargeCreate);

    expect(charge.id).toEqual(expect.any(String));
    expect(charge.client).toEqual('test');
  });
});
