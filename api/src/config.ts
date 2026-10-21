import "dotenv/config";
import z from "zod";

const EnvSchema = z.object({
  PORT: z.coerce.number().positive(),
  URL: z.url(),
  API_PREFIX: z.string(),
  NODE_ENVIRONMENT: z.enum(["development", "staging", "production"]),
  OPEN_API_PATH: z.string(),
  SWAGGER_PATH: z.string(),
  DATABASE_URL: z.url(),
  BCRYPT_SALT: z.coerce.number(),
});

const env = EnvSchema.parse(process.env);

export const config = {
  api: {
    port: env.PORT,
    url: env.URL,
    prefix: env.API_PREFIX,
    openApiPath: env.OPEN_API_PATH,
    swaggerPath: env.SWAGGER_PATH,
  },

  environment: {
    value: env.NODE_ENVIRONMENT,
    isDevelopment: () => {
      return env.NODE_ENVIRONMENT === "development";
    },
    isStaging: () => {
      return env.NODE_ENVIRONMENT === "staging";
    },
    isProduction: () => {
      return env.NODE_ENVIRONMENT === "production";
    },
  },

  database: {
    url: env.DATABASE_URL,
  },

  security: {
    bcrypt: {
      salt: env.BCRYPT_SALT,
    },
  },
};

export type Config = typeof config;
