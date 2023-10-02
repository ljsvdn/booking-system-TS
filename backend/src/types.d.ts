import { container as tsyringeContainer } from "tsyringe";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        role: string;
      };
      role?: string;
      container: typeof tsyringeContainer;
    }
  }
}
