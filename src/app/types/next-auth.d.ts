import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend the default User type
declare module "next-auth" {
  interface User extends DefaultUser {
    token: string;
    firstName: string;
    lastName: string;
    role: string;
    team: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      team: string;
    } & DefaultSession["user"];
    accessToken: string;
  }

  interface JWT {
    user?: User;
    accessToken?: string;
  }
}
