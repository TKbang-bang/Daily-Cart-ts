class ServerError extends Error {
  about: string;
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, about: string, statusCode: number) {
    super(message);

    this.about = about;
    this.statusCode = statusCode;
    this.isOperational = true;

    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

export default ServerError;
