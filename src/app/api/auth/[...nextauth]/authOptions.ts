import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        hash: { label: "Hash", type: "text" },
      },
      async authorize(credentials) {
        let data = null;
        try {
          let data: any;
          if (credentials?.hash) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/authenticate`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                hash: credentials?.hash,
              }),
            });
            data = await res.json();
          } else {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            });
            data = await res.json();

          }



          if (data.success) {
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
    signIn: "/auth/login",
    error: "/auth/error",
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
      const customSession: any = {
        ...session
      }
      if (token.user) {

        customSession.user = token.user;
        customSession.accessToken = token.accessToken || "";
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};