import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userDetail: {
      [key: string]: any; // Customize your user object structure
      userId?: string; // Example: Add specific fields for type safety
      isAdmin?: boolean;
    };
  }
}
