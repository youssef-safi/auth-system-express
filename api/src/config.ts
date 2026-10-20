import "dotenv/config";
import z from "zod";

const EnvSchema = z.object({
  port: z.coerce.number().positive(),
  url: z.url(),
  api_prefix: z.string(),
  node_environment: z.enum(["development", "staging", "production"]),
  open_api_path: z.string(),
  swagger_path: z.string(),
  database_url: z.url(),
});

const env = EnvSchema.parse(process.env);

export const config = {
  api: {
    port: env.port,
    url: env.url,
    prefix: env.api_prefix,
    openApiPath: env.open_api_path,
    swaggerPath: env.swagger_path,
  },

  environment: {
    value: env.node_environment,
    isDevelopment: () => {
      return env.node_environment === "development";
    },
    isStaging: () => {
      return env.node_environment === "staging";
    },
    isProduction: () => {
      return env.node_environment === "production";
    },
  },

  database: {
    url: env.database_url,
  },
};

export type Config = typeof config;
