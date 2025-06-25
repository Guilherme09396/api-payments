import {
  beforeEach, describe, expect, test,
} from 'vitest';
import { CreatePaymentsService } from './create-payments-service';
import { PaymentRepository } from '@/repositories/Payment-repository';
import { InMemoryPaymentsRepository } from '@/repositories/in-memory/in-memory-payments-repository';
import { FindByIdChargeService } from '../charges/find-by-id-charge-service';
import { ChargeRepository } from '@/repositories/Charge-repository';
import { InMemoryChargesRepository } from '@/repositories/in-memory/in-memory-charges-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { AlreadyExistsPaymentError } from '../errors/already-exists-payment-error';

describe('serviço de criação de pagamentos', () => {
  let repoCharges: ChargeRepository;
  let repoPayments: PaymentRepository;
  let sut: CreatePaymentsService;

  beforeEach(() => {
    repoCharges = new InMemoryChargesRepository();
    repoPayments = new InMemoryPaymentsRepository();
    sut = new CreatePaymentsService(repoPayments, repoCharges);
  });

  test('é esperado um erro ao tentar criar um pagamento para uma cobrança inválida', async () => {
    await expect(sut.execute({ status: 'pending', method: 'pix', chargesId: '1' })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  test('é esperado criar um pagamento', async () => {
    const charge = await repoCharges.create({
      client: 'Guilherme',
      amount: 1000,
      status: 'pending',
      description: 'teste',
    });

    const { payment } = await sut.execute({ status: 'success', chargesId: charge.id, method: 'pix' });
    expect(payment.id).toEqual(expect.any(String));
  });

  test('é esperado um erro ao tentar criar um pagamento para a mesma cobrança', async () => {
    const charge = await repoCharges.create({
      client: 'Guilherme',
      amount: 1000,
      status: 'pending',
      description: 'teste',
    });

    await sut.execute({ status: 'success', chargesId: charge.id, method: 'pix' });
    await expect(sut.execute({ status: 'success', chargesId: charge.id, method: 'pix' })).rejects.toBeInstanceOf(AlreadyExistsPaymentError);
  });

  test('é esperado modificar status da cobrança para o status solicitado', async () => {
    const charge = await repoCharges.create({
      client: 'Guilherme',
      amount: 1000,
      status: 'pending',
      description: 'teste',
    });

    await sut.execute({ status: 'success', chargesId: charge.id, method: 'pix' });
    const chargeResult = await repoCharges.findById(charge.id);
    expect(chargeResult?.status).toEqual('paid');
  });
});
