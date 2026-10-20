import type { ErrorRequestHandler } from "express";
import { httpResponse } from "../shared/http-response/http-response.js";
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../shared/errors/errors.js";
import { logger } from "../infrastructure/logging/logger.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof NotFoundError) {
    return httpResponse.notFound(res, {
      code: err.code,
      message: err.message,
    });
  }

  if (err instanceof ValidationError) {
    return httpResponse.badRequest(res, {
      code: err.code,
      message: err.message,
    });
  }

  if (err instanceof ConflictError) {
    return httpResponse.conflict(res, {
      code: err.code,
      message: err.message,
    });
  }

  if (err instanceof UnauthorizedError) {
    return httpResponse.unauthorized(res, {
      code: err.code,
      message: err.message,
    });
  }

  if (err instanceof ForbiddenError) {
    return httpResponse.forbidden(res, {
      code: err.code,
      message: err.message,
    });
  }

  logger.error({
    error: err,
  });

  return httpResponse.internalServer500(res, {
    code: err.code,
    message: err.message,
  });
};
