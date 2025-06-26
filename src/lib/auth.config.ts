import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    userRole?: string;
  }
}

interface IdTokenClaims {
  "https://next-auth.com/roles"?: string[];
  [key: string]: unknown;
}

interface CustomUser {
  id: string;
  email?: string;
  accessToken?: string;
  idToken?: string;
  userRole?: string;
}

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "mail@site.com" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            grant_type: "password",
            username: credentials.email,
            password: credentials.password,
            scope: "openid profile email",
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            connection: process.env.AUTH0_CONNECTION,
          }),
        });

        const data = await res.json();

        if (!data.access_token || !data.id_token) {
          console.log("Auth0 login error:", data);
          return null;
        }

        const decoded = jwtDecode<IdTokenClaims>(data.id_token);
        const roles = decoded["https://next-auth.com/roles"];

        return {
          id: data.sub,
          email: credentials.email,
          accessToken: data.access_token,
          idToken: data.id_token,
          userRole: Array.isArray(roles) && roles.length > 0 ? roles[0] : "user",
        };
      },
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
  async jwt({ token, user, account }) {
    if (user) {
      token.accessToken = (user as CustomUser).accessToken;
      token.userRole = (user as CustomUser).userRole ?? "user";
    }

    if (account?.id_token) {
      const decoded = jwtDecode<IdTokenClaims>(account.id_token as string);
      const roles = decoded["https://next-auth.com/roles"];
      if (Array.isArray(roles) && roles.length > 0) {
        token.userRole = roles[0];
      }
    }

    return token;
  },

  async session({ session, token }) {
    session.accessToken = typeof token.accessToken === "string" ? token.accessToken : undefined;
    session.userRole = typeof token.userRole === "string" ? token.userRole : "user";
    return session;
  },

  async redirect({ url, baseUrl }) {
    const isLogout = url.includes("/signout") || url.includes("callbackUrl");

    if (isLogout) {
      return baseUrl;
    }

    return url.startsWith(baseUrl) ? url : baseUrl;
  },
}

};
