import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'
import bcrypt from 'bcryptjs'
import dbConnect from './mongodb'
import User from '@/models/User'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        await dbConnect()

        const user = await User.findOne({ email: credentials.email })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        if (!user.isActive) {
          throw new Error('Account is disabled')
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'credentials') {
        return true
      }

      // Handle social login
      if (account?.provider && ['facebook', 'twitter'].includes(account.provider)) {
        await dbConnect()

        const existingUser = await User.findOne({
          $or: [
            { email: user.email },
            { provider: account.provider, providerId: account.providerAccountId }
          ]
        })

        if (existingUser) {
          // Update existing user
          existingUser.name = user.name || existingUser.name
          existingUser.image = user.image || existingUser.image
          existingUser.provider = account.provider
          existingUser.providerId = account.providerAccountId
          await existingUser.save()
        } else {
          // Create new user
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account.provider,
            providerId: account.providerAccountId,
            emailVerified: new Date(),
          })
        }
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
}

declare module 'next-auth' {
  interface User {
    role?: string
  }
  
  interface Session {
    user: {
      id: string
      email: string
      name: string
      image?: string
      role?: string
    }
  }
}