export class AlreadyExistsPaymentError extends Error {
  constructor() {
    super('Already Exists Payment.');
  }
}
