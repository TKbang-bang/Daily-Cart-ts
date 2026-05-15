import { UserID } from "../user";

declare global {
  namespace Express {
    interface Request {
      userID?: UserID;
    }
  }
}

export {};
