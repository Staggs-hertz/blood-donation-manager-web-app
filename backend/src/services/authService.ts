import bcrypt from "bcryptjs";
import { prisma } from "../config/database";
import { LoginInput, RegisterInput } from "../validators/authValidator";
import { ConflictError, UnauthorizedError } from "../utils/error";
import { Role } from "../generated/prisma/enums";

const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS);

export const authService = {
  // REGISTER
  async register(data: RegisterInput, ipAddress?: string, userAgent?: string) {
    //check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictError(
        "An account with this email already exists",
        "EMAIL_EXISTS",
      );
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(data.password, BCRYPT_ROUNDS);

    // Create user
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          role: data.role as Role,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
        },
      });
      return newUser;
    });

    return {
      user,
      message:
        "Registration successful. Please check your email to verify your account.",
    };
  },

  // LOGIN
  async login(data: LoginInput, ipAddress?: string, userAgent?: string) {
    // Find user with password
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      await bcrypt.compare(
        data.password,
        "$2b$12$invalid.hash.placeholder.xxxx",
      );
      throw new UnauthorizedError(
        "Invalid email or password",
        "INVALID_CREDENTIALS",
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError(
        "Invalid email or password",
        "INVALID_CREDENTIALS",
      );
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  },
};
