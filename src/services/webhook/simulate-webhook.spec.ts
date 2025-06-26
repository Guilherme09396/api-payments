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
import { SimulateWebhookService } from './simulate-webhook-service';

describe('serviço de reembolso do pagamentos', () => {
  let repoCharges: ChargeRepository;
  let repoPayments: PaymentRepository;
  let sut: SimulateWebhookService;

  beforeEach(() => {
    repoCharges = new InMemoryChargesRepository();
    repoPayments = new InMemoryPaymentsRepository();
    sut = new SimulateWebhookService(repoCharges, repoPayments);
  });

  test('é esperado um erro ao tentar simular webhook com id de uma cobrança inexistente', async () => {
    await expect(sut.execute({ event: 'payment_success', chargeId: 'nao-existe' })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  test('é esperado um erro ao tentar simular webhook com um evento inexistente', async () => {
    const { id } = await repoCharges.create({
      client: 'Guilherme',
      amount: 100,
      description: 'Teste',
      status: 'pending',
    });
    await expect(sut.execute({ event: 'nao-existe', chargeId: id })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  test('é esperado atualizar o status da cobrança de acordo com o evento enviado', async () => {
    const { id } = await repoCharges.create({
      client: 'Guilherme',
      amount: 100,
      description: 'Teste',
      status: 'pending',
    });
    await sut.execute({ event: 'payment_success', chargeId: id });
    let charge = await repoCharges.findById(id);
    expect(charge?.status).toEqual('paid');

    await sut.execute({ event: 'payment_failed', chargeId: id });
    charge = await repoCharges.findById(id);
    expect(charge?.status).toEqual('failed');
  });
});
