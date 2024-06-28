import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

// Controller error handling
export const handleControllerError = (err: any, res: Response): void => {
  res.status(400).json({
    message: axios.isAxiosError(err)
      ? err.response?.statusText
      : (err as Error).message,
  });
};

// Handling not found routes
export const handleNotFound = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log('Route not found');
  res.status(404).send(`Route not found for: ${req.path}`);
  next();
};

// General error handling
export const handleError = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
): void | Response => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);
  return res.status(500).json({
    error: true,
    message: err.message,
  });
};

// Success response
export const sendSuccessResponse = (
  res: Response,
  data: any,
  message: string = 'Request was successful',
  statusCode: number = 200,
): void => {
  res.status(statusCode).json({
    message,
    data,
  });
};

// Error response
export const sendErrorResponse = (
  res: Response,
  error: any,
  statusCode: number = 400,
): void => {
  res.status(statusCode).json({
    error: true,
    message: error.message || 'Unknown error',
  });
};
