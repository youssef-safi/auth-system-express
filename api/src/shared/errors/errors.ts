export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

export class ValidationError extends AppError {
  constructor(code: string, message: string) {
    super(code, message);
  }
}

export class NotFoundError extends AppError {
  constructor(code: string, message: string) {
    super(code, message);
  }
}

export class ConflictError extends AppError {
  constructor(code: string, message: string) {
    super(code, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(code: string, message: string) {
    super(code, message);
  }
}

export class ForbiddenError extends AppError {
  constructor(code: string, message: string) {
    super(code, message);
  }
}

export class InternalServerError extends AppError {
  constructor(code: string, message: string) {
    super(code, message);
  }
}
