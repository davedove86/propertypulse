import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callback: {
    // invoked on successful sign in
    async signIn({ profile }) {
      // connect to database
      // check if user exisits
      // if not, create user
      // Return true to allow sign in
    },
    // Session callback function that modifies the session object
    async session({ session, token, user }) {
      // get the user from the database
      // assign user ID from session
      // Return the session
    },
  },
};
