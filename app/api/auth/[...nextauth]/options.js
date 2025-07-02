import GoogleProvider from "next-auth/providers/google";
import User from "@/app/(models)/User";

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google: ", profile);

        // Check if email is from allowed domain
        if (!profile.email.endsWith('@citchennai.net')) {
          throw new Error('Only @citchennai.net domain emails are allowed');
        }

        let userRole = "employee";
        // Set admin role for specific email
        if (profile?.email === "ravikrishnaj25@gmail.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          // Check if user exists in database
          let existingUser = await User.findOne({ email: user.email });
          
          if (!existingUser) {
            // Create new user
            await User.create({
              name: user.name,
              email: user.email,
              role: user.role,
              googleId: user.id,
            });
          } else {
            // Update existing user's Google ID if not set
            if (!existingUser.googleId) {
              existingUser.googleId = user.id;
              await existingUser.save();
            }
          }
          return true;
        } catch (error) {
          console.log("Error saving user", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        
        // Fetch updated user data from database
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.role = dbUser.role;
          session.user.id = dbUser._id.toString();
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
    error: '/auth/error',
  },
};