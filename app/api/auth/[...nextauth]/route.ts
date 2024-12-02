import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/User"
import { dbConnect } from "@/lib/utils"
import { compare } from "bcryptjs"

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.NEXTAUTH_GITHUB_CLIENT_ID || '',
            clientSecret: process.env.NEXTAUTH_GITHUB_CLIENT_SECRET || ''
          })
       ,CredentialsProvider({
        name: "credentials",
        credentials: {
            email:{
                label: "Email",
                type: "email",
            },
            username: {
              label: "Username",
              type: "text",
            },
            password: {
              label: "Password",
              type: "password",
            },
          },
        authorize: async (credentials) => {
            dbConnect();
          const exists = await User.findOne({email:credentials?.email});
          if(credentials?.password && exists?.password && await compare(credentials.password, exists.password)){
            return exists
          }else{
            return null
          }
        }
       })
      ],
      secret: '4657890-@&^%$#jukhjn',
    callbacks: {
      async session({ session, token }) {
        session.user.id = token.id;
        console.log("session ", session);
        return session;
      },
    },
    pages: {
        signIn: '/sign-in',
    }
})

export { handler as GET, handler as POST }

