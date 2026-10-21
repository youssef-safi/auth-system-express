import express from "express";
import type { Config } from "./config.js";
import { apiRouter } from "./router.js";
import { requestLogger } from "./middlewares/request-logger.middleware.js";
import { setupSwaggerAndOpenApi } from "./shared/openapi/swagger.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import session from "express-session";

export function createApp(config: Config) {
  const app = express();

  app.use(requestLogger);

  app.use(
    express.json({
      limit: "1mb",
    }),
  );

  app.use(
    session({
      secret: "edzui_@s7832jdDZEFZEDAZ2342_bie",
      name: "sessionId",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60,
      },
    }),
  );

  setupSwaggerAndOpenApi(app);

  app.use(config.api.prefix, apiRouter);

  app.use(errorHandler);

  return app;
}
