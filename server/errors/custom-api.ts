import { StatusCodes } from "http-status-codes";

export default class CustomAPIError extends Error {
  public statusCode: number;

  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
