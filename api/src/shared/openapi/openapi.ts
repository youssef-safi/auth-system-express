import {
  OpenApiGeneratorV31,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { config } from "#/config.js";

export const openApiRegistry = new OpenAPIRegistry();

export function generateOpenApiDocument() {
  const generator = new OpenApiGeneratorV31(openApiRegistry.definitions);

  const document = generator.generateDocument({
    openapi: "3.1.0",
    info: {
      title: "Authentication Rest Api",
      version: "1.0.0",
    },
    servers: [
      {
        url: config.api.url,
        description: config.environment.value,
      },
    ],
    tags: [
      {
        name: "Authentication",
        description: "Authentication operations",
      },
    ],
  });

  return document;
}
