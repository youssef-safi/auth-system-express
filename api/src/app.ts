import express from "express";
import type { Config } from "./config.js";
import { apiRouter } from "./router.js";
import { requestLogger } from "./middlewares/request-logger.middleware.js";
import { setupSwaggerAndOpenApi } from "./shared/openapi/swagger.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";

export function createApp(config: Config) {
  const app = express();

  app.use(requestLogger);

  app.use(
    express.json({
      limit: "1mb",
    }),
  );

  setupSwaggerAndOpenApi(app);

  app.use(config.api.prefix, apiRouter);

  app.use(errorHandler);

  return app;
}
