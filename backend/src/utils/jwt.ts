import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { jwtConfig } from "../config/jwtConfig";
import { Role } from "../generated/prisma/enums";

export interface AccessTokenPayload {
  userId: string;
  email: string;
  role: Role;
  type: "access";
}

export interface RefreshTokenPayload {
  userId: string;
  tokenId: string;
  type: "refresh";
}

export const generateAccessToken = (
  userId: string,
  email: string,
  role: Role,
): string => {
  const payload: AccessTokenPayload = { userId, email, role, type: "access" };
  return jwt.sign(payload, jwtConfig.accessSecret, {
    expiresIn: jwtConfig.accessExpiresIn,
    issuer: "bloodlink-api",
    audience: "bloodlink-client",
  } as SignOptions);
};

export const generateRefreshToken = (
  userId: string,
  tokenId: string,
): string => {
  const payload: RefreshTokenPayload = { userId, tokenId, type: "refresh" };
  return jwt.sign(payload, jwtConfig.refreshSecret, {
    expiresIn: jwtConfig.refreshExpiresIn,
    issuer: "bloodlink-api",
    audience: "bloodlink-client",
  } as SignOptions);
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  const decoded = jwt.verify(token, jwtConfig.accessSecret, {
    issuer: "bloodlink-api",
    audience: "bloodlink-client",
  }) as JwtPayload & AccessTokenPayload;

  if (decoded.type !== "access") {
    throw new Error("Invalid token type");
  }

  return decoded;
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  const decoded = jwt.verify(token, jwtConfig.refreshSecret, {
    issuer: "bloodlink-api",
    audience: "bloodlink-client",
  }) as JwtPayload & RefreshTokenPayload;

  if (decoded.type !== "refresh") {
    throw new Error("Invalid token type");
  }

  return decoded;
};
