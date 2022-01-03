export default class ServerError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(`Server error: ${message || 'Something went wrong'}`);
    this.statusCode = statusCode;
  }
}
