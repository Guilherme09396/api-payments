export class NotFoundPaymentError extends Error {
  constructor() {
    super('Not Found Payment.');
  }
}
