import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import dbConnect from "../../../utils/dbConnect"
import User from "../../../models/User"
import _ from "lodash"

/* Authentication */
export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Custom Provider',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        image: { label: "Image", type: "text"},
        api: {label: "Api", type: "text"},
      },
      async authorize(credentials, req) {
        const dev = process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : "https://socialart.jonathanfreire.com/api";
        const res = await fetch(dev + "/loginorsignup", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json();
        // If no error and we have user data, return it
        if (res.ok && user.success) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 7 * 24 * 60 * 60, // 7 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.JWT_SIGNING_PRIVATE_KEY,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },
  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn(user, account, profile) { return user },
    // async redirect(url, baseUrl) { return baseUrl },
    async session(session, token) { 
      await dbConnect();
      var user = await User.findOne({username: session.user.name});
      const model = {
        id: null,
        username: null,
        image: null,
        favourites: null
      };
      const result = _.pick(user, _.keys(model));
      session.user.user = result;
      return session;
    },
  },
  theme: 'auto',
  debug: false,
})
