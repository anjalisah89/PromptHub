import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    
    async session({ session }){
        // find existing users
        const sessionUser = await User.findOne({
            email: session.user.email
        })

        //updating the data of an existing users
        session.user.id = sessionUser._id.toString();

        return session;
    },

    async signIn({ profile }){
       
        try{
            //serverless -> dynamicdb
            await connectToDB();
            // check if a user already exists
            const userExists = await User.findOne({
                email: profile.email
            });

            //if not, create a new user

            if(!userExists){
                await User.create({
                    email: profile.email,
                    username:profile.name.replace(" ","").toLowerCase(),
                    image: profile.picture
                })
            }

            return true;
        }
        catch(error){
            console.log(error);
            return false;
        }

    }
})

export { handler as GET, handler as POST };