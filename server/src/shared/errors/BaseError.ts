export class BaseError extends Error {
    public code: string;
    public statusCode: number;
    public details?: any;
  
    constructor(message: string, code: string, statusCode: number, details?: any) {
      super(message);
      this.name = this.constructor.name;
      this.code = code;
      this.statusCode = statusCode;
      this.details = details;
      Error.captureStackTrace(this, this.constructor);
    }
  }