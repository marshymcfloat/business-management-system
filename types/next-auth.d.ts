// types/next-auth.d.ts

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

/**
 * Module augmentation for `next-auth/jwt`
 * Extends the JWT type to include the `id` property.
 */
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    username: string | null;
  }
}

/**
 * Module augmentation for `next-auth`
 * Extends the Session and User types to include the `id` property.
 */
declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the object returned from the `authorize` callback in the Credentials provider.
   */
  interface User extends DefaultUser {
    // You can add any other properties you want to the User object
    username: string | null;
  }

  /**
   * The shape of the session object returned from `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string; // This is the property you want to add
      username: string | null;
    } & DefaultSession["user"]; // ...and combine it with the default properties
  }
}
