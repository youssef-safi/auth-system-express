import type { User } from "#/infrastructure/database/generated/prisma/client.js";
import type { UserDto } from "./auth.schemas.js";

export function toUserDto(user: User): UserDto {
  return {
    id: user.id,
    email: user.email,
  };
}
