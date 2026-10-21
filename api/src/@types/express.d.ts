import "express-serve-static-core";
import type { UserDto } from "#/modules/auth/auth.schemas.ts";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserDto;

    validated?: {
      body?: unknown;
      query?: unknown;
      params?: unknown;
    };
  }
}
