import { Response } from "express";

interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: Record<string, unknown>;
  errors?: unknown[];
}

export const sendSuccess = <T>(
  res: Response,
  data?: T,
  message: string = "Success",
  statusCode: number = 200,
  meta?: Record<string, unknown>,
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    ...(data !== undefined && { data }),
    ...(meta && { meta }),
  };
  return res.status(statusCode).json(response);
};

export const sendCreated = <T>(
  res: Response,
  data?: T,
  message: string = "Created successfully",
): Response => {
  return sendSuccess(res, data, message, 201);
};

export const sendError = (
  res: Response,
  message: string = "An error occurred",
  statusCode: number = 500,
  errors?: unknown[],
): Response => {
  const response: ApiResponse = {
    success: false,
    message,
    ...(errors && { errors }),
  };
  return res.status(statusCode).json(response);
};

export const sendPaginated = <T>(
  res: Response,
  data: T[],
  total: number,
  page: number,
  limit: number,
  message: string = "Success",
): Response => {
  return sendSuccess(res, data, message, 200, {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  });
};
