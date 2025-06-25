import {
  beforeEach, describe, expect, test,
} from 'vitest';
import { PaymentRepository } from '@/repositories/Payment-repository';
import { InMemoryPaymentsRepository } from '@/repositories/in-memory/in-memory-payments-repository';
import { ChargeRepository } from '@/repositories/Charge-repository';
import { InMemoryChargesRepository } from '@/repositories/in-memory/in-memory-charges-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { FindPaymentsService } from './find-payments-service';

describe('serviço de busca por pagamentos', () => {
  let repoCharges: ChargeRepository;
  let repoPayments: PaymentRepository;
  let sut: FindPaymentsService;

  beforeEach(() => {
    repoCharges = new InMemoryChargesRepository();
    repoPayments = new InMemoryPaymentsRepository();
    sut = new FindPaymentsService(repoPayments, repoCharges);
  });

  test('é esperado todos os pagamentos, neste caso sem nada', async () => {
    const { payments } = await sut.execute();
    expect(payments.length).toBe(0);
    expect(payments instanceof Array).toBe(true);
  });

  test('é esperado todos os pagamentos', async () => {
    const charge = await repoCharges.create({
      client: 'Guilherme',
      amount: 1000,
      status: 'pending',
      description: 'teste',
    });

    await repoPayments.create({ status: 'success', charges_id: charge.id, method: 'pix' });
    const { payments } = await sut.execute();
    expect(payments.length).toBe(1);
    expect(payments instanceof Array).toBe(true);
  });
});
