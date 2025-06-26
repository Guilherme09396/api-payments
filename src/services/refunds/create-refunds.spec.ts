import {
  beforeEach, describe, expect, test,
} from 'vitest';
import { PaymentRepository } from '@/repositories/Payment-repository';
import { InMemoryPaymentsRepository } from '@/repositories/in-memory/in-memory-payments-repository';
import { FindByIdChargeService } from '../charges/find-by-id-charge-service';
import { ChargeRepository } from '@/repositories/Charge-repository';
import { InMemoryChargesRepository } from '@/repositories/in-memory/in-memory-charges-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { AlreadyExistsPaymentError } from '../errors/already-exists-payment-error';
import { CreateRefundsService } from './create-refunds-service';
import { NotFoundPaymentError } from '../errors/not-found-payment-error';

describe('serviço de reembolso do pagamentos', () => {
  let repoCharges: ChargeRepository;
  let repoPayments: PaymentRepository;
  let sut: CreateRefundsService;

  beforeEach(() => {
    repoCharges = new InMemoryChargesRepository();
    repoPayments = new InMemoryPaymentsRepository();
    sut = new CreateRefundsService(repoCharges, repoPayments);
  });

  test('é esperado um erro ao tentar reembolso caso a cobrança não exista', async () => {
    await expect(sut.execute({ chargeId: 'nao-existe' })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  test('é esperado um erro ao tentar reembolso caso o pagamento não exista', async () => {
    const { id } = await repoCharges.create({
      amount: 100,
      client: 'Guilherme',
      description: 'teste',
      status: 'paid',
    });

    await expect(sut.execute({ chargeId: id })).rejects.toBeInstanceOf(NotFoundPaymentError);
  });

  test('é esperado um erro ao reembolsar um pagamento caso o pagamento não esteja como pago', async () => {
    const { id } = await repoCharges.create({
      amount: 100,
      client: 'Guilherme',
      description: 'teste',
      status: 'paid',
    });

    await repoPayments.create({ charges_id: id, method: 'pix', status: 'success' });

    const { charge } = await sut.execute({ chargeId: id });
    expect(charge.status).toBe('refunded');
  });
});
