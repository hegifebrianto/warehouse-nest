// src/types/express.d.ts
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: {
	  isConfirmed: any;
      sub: string;
      username: string;
      // tambahkan field lain jika perlu
    };
  }
}
