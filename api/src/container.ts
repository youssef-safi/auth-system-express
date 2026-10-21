import { prisma } from "./infrastructure/database/prisma.js";

import {
  AuthController,
  AuthService,
  BcryptPasswordHasher,
} from "./modules/auth/index.js";

const bcryptPasswordHasher = new BcryptPasswordHasher();
const authService = new AuthService(prisma, bcryptPasswordHasher);
const authController = new AuthController(authService);

export { authController };

import { createAuthenticate } from "./modules/auth/middlewares/authenticate.middleware.js";

export const authenticate = createAuthenticate(prisma);
