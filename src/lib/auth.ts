import { User, Account, Profile, Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import client from "@/config/db";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

export const AUTH_OPTIONS = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ user }: { user: User | AdapterUser }) => {
      if (!(user.name && user.email)) {
        return false;
      }
      const existingUser = await client.user.findUnique({
        where: { email: user.email ?? "" },
      });
      if (!existingUser) {
        await client.user.create({
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          },
        });
      }
      return true;
    },
    session: ({ session, token }: { session: Session; token: JWT }) => {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin"
  }
};
