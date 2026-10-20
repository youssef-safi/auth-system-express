import pino from "pino";
import { config } from "#/config.js";

export const logger = pino({
  level: "info",

  ...(config.environment.isDevelopment() && {
    transport: {
      target: "pino-pretty",
    },
  }),
});
