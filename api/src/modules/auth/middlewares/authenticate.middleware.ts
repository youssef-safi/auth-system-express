import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "#/shared/errors/errors.js";
import type { PrismaClient } from "#/infrastructure/database/generated/prisma/client.js";

export const createAuthenticate =
  (prisma: PrismaClient) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const userId = req.session.userId;

    if (userId === undefined) {
      throw new UnauthorizedError("UNAUTHORIZED", "Authentication is required");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user === null) {
      throw new UnauthorizedError("UNAUTHORIZED", "Authentication is required");
    }

    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  };
