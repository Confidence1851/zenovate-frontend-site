import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        let data = null;
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

           data = await res.json();

          if (res.ok && data.success) {
            const { user, token } = data.data;
            return {
              id: user.id.toString(),
              firstName: user.first_name,
              lastName: user.last_name,
              email: user.email,
              role: user.role,
              team: user.team,
              token,
            };
          }

           throw new Error(JSON.stringify(data));
        } catch (error) {
          throw new Error(JSON.stringify(data));
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // Custom login page
    error: "/auth/error", // Custom error page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
        session.accessToken = token.accessToken || "";
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
