import * as express from 'express';
import * as passport from 'passport';

declare global {
  namespace Express {
    interface Request {
      logout(callback?: (err?: any) => void): void;
      isAuthenticated(): boolean;
      isUnauthenticated(): boolean;
    }
  }
}
