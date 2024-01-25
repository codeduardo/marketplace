import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@/app/libs/prismadb";

export const authOptions = {
  pages: { signIn: "/auth/login" },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async session({ session, token }) {
      const userFound = await db.user.findFirst({
        where: { email: session.user.email },
      });
      if (!userFound) throw new Error("user not found");
      session.user.rol = userFound?.rol;
      return Promise.resolve(session);
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const userFound = await db.user.findFirst({
          where: { email: credentials?.email },
        });
        if (!userFound) throw new Error("User not found");

        const isCorrectPass = await bcrypt.compare(
          credentials?.password ?? "",
          userFound.password,
        );
        if (!isCorrectPass) throw new Error("Wrong password");
        return {
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
          rol: userFound.email,
        };
      },
    }),
  ],
};

const auth = NextAuth(authOptions);
export { auth as GET, auth as POST };
