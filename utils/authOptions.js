import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/database';
import User from '@/models/User';

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
  callbacks: {
    // invoked on successful sign in
    async signIn({ profile }) {
      // connect to database
      await connectDB();
      // check if user exisits
      const userExists = await User.findOne({ email: profile.email });
      // if not, create user
      if (!userExists) {
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // Return true to allow sign in
      return true;
    },
    // Session callback function that modifies the session object
    async session({ session }) {
      // get the user from the database
      const user = await User.findOne({ email: session.user.email });
      // assign user ID from session
      session.user.id = user._id.toString();
      // Return the session
      return session;
    },
  },
};
