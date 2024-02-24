import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  callbacks:{
    async session({ session, token }) {
      const user = {
        name:session.user?.name,
        email:session.user?.email,

      }
      const res = await fetch("http://localhost:3000/api/email/getUser", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" }
      })
      const { userId } = await res.json()
      if (session?.user) {
        session.user.id = userId || "";
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      return token
    }
  

  
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_APP_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_APP_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Email',
      credentials: {
        username: { label: "Email", type: "text", placeholder: "jsmith@no.org" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:3000/api/email/signin", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const { user } = await res.json()

        if (res.ok && user) {
          return user
        }
        return null
      }
    })
  ],
};