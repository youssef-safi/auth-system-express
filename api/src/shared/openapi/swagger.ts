import type { Express } from "express";
import { config } from "#/config.js";
import { httpResponse } from "../http-response/http-response.js";
import { generateOpenApiDocument } from "./openapi.js";
import swaggerUi from "swagger-ui-express";

export function setupSwaggerAndOpenApi(app: Express) {
  const document = generateOpenApiDocument();

  app.get(config.api.openApiPath, (_req, res) => {
    return httpResponse.ok(res, document);
  });

  app.use(config.api.swaggerPath, swaggerUi.serve, swaggerUi.setup(document));
}
