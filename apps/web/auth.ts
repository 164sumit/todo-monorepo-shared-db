import { PrismaClient } from ".prisma/client";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut,auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });
        if (!user) {
          throw new Error("No user found");
        }
        if (user.password !== credentials.password) {
          throw new Error("Password does not match");
        }
        return {
          ...user,
          id: user.id.toString(),
          image:user.id.toString()
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    // session({ session, user }) {
    //   session.user.id = user.id
    //   return session
    // },
  }
});
