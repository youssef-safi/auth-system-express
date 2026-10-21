import { openApiRegistry } from "#/shared/openapi/openapi.js";
import { config } from "../../config.js";
import {
  LoginDtoSchema,
  RegisterDtoSchema,
  UserDtoSchema,
} from "./auth.schemas.js";

// Register

openApiRegistry.registerPath({
  method: "post",
  path: `${config.api.prefix}/auth/register`,
  summary: "Register user",
  tags: ["Authentication"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: RegisterDtoSchema,
        },
      },
    },
  },
  responses: {
    201: {
      summary: "User registered",
      content: {
        "application/json": {
          schema: UserDtoSchema,
        },
      },
    },
  },
});

// Login

openApiRegistry.registerPath({
  method: "post",
  path: `${config.api.prefix}/auth/login`,
  summary: "Login",
  tags: ["Authentication"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: LoginDtoSchema,
        },
      },
    },
  },
  responses: {
    200: {
      summary: "User logged in",
      content: {
        "application/json": {
          schema: UserDtoSchema,
        },
      },
    },
  },
});

// Logout

openApiRegistry.registerPath({
  method: "post",
  path: `${config.api.prefix}/auth/logout`,
  summary: "Logout",
  tags: ["Authentication"],
  responses: {
    204: {
      summary: "User logged out",
    },
  },
});
