import z from "#/shared/openapi/zod.js";

// Register Dto

export const RegisterDtoSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;

// Login Dto

export const LoginDtoSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type LoginDto = z.infer<typeof LoginDtoSchema>;

// User Dto

export const UserDtoSchema = z.object({
  id: z.uuid(),
  email: z.email(),
});

export type UserDto = z.infer<typeof UserDtoSchema>;
