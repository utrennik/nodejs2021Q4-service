export default class ClientError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(`Client error: ${message}`);
    this.statusCode = statusCode;
  }
}
