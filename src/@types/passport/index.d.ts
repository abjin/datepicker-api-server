import { User } from '../../../libs/prisma/src/generated';

declare global {
  declare namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
