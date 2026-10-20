import { pinoHttp } from "pino-http";
import { logger } from "../infrastructure/logging/logger.js";

export const requestLogger = pinoHttp({
  logger,
});
