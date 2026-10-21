import pino from "pino";
import { config } from "#/config.js";

export const logger = pino({
  level: "info",

  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      'res.headers["set-cookie"]',
    ],
    remove: true,
  },

  ...(config.environment.isDevelopment() && {
    transport: {
      target: "pino-pretty",
    },
  }),
});
