import { Router } from "express";
import { authController, authenticate } from "#/container.js";
import { validate } from "#/middlewares/validate.middleware.js";
import { LoginDtoSchema, RegisterDtoSchema } from "./auth.schemas.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validate({
    bodySchema: RegisterDtoSchema,
  }),
  authController.register,
);

authRouter.post(
  "/login",
  validate({
    bodySchema: LoginDtoSchema,
  }),
  authController.login,
);

authRouter.post("/logout", authenticate, authController.logout);

export { authRouter };
