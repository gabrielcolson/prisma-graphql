/* eslint-disable max-classes-per-file */

export class CustomError extends Error {
  error?: unknown;

  constructor(message: string, error?: unknown) {
    super(message);
    this.error = error;
  }
}

export class AuthenticationError extends CustomError { }
export class ForbiddenError extends CustomError { }
