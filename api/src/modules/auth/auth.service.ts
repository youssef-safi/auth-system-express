import {
  Prisma,
  type PrismaClient,
} from "#/infrastructure/database/generated/prisma/client.js";
import { ConflictError, UnauthorizedError } from "#/shared/errors/errors.js";
import { toUserDto } from "./auth.mapper.js";
import type { LoginDto, RegisterDto, UserDto } from "./auth.schemas.js";
import type { PasswordHasher } from "./interfaces/password-hasher.js";

export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async register(dto: RegisterDto): Promise<UserDto> {
    try {
      const passwordHash = await this.passwordHasher.hash(dto.password);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          passwordHash,
        },
      });

      return toUserDto(user);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictError(
          "EMAIL_ALREADY_EXISTS",
          "Email already exists.",
        );
      }

      throw error;
    }
  }

  async login(dto: LoginDto): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user === null) {
      throw new UnauthorizedError(
        "INVALID_CREDENTIALS",
        "Invalid credentials.",
      );
    }

    const isPasswordMatch = await this.passwordHasher.compare(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedError(
        "INVALID_CREDENTIALS",
        "Invalid credentials.",
      );
    }

    return toUserDto(user);
  }
}
