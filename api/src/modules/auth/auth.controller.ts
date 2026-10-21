import type { NextFunction, Request, Response } from "express";
import type { AuthService } from "./auth.service.js";
import type { LoginDto, RegisterDto } from "./auth.schemas.js";
import { httpResponse } from "#/shared/http-response/http-response.js";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const dto = req.validated!.body as RegisterDto;

    const userDto = await this.authService.register(dto);

    return httpResponse.created(res, userDto);
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const dto = req.validated!.body as LoginDto;

    const userDto = await this.authService.login(dto);

    req.session.regenerate((err) => {
      if (err) return next(err);

      req.session.userId = userDto.id;

      return httpResponse.ok(res, userDto);
    });
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((err) => {
      if (err) return next(err);

      res.clearCookie("sessionId");

      return httpResponse.noContent(res);
    });
  };
}
