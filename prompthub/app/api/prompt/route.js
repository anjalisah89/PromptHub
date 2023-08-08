//route to fetch all the posted prompts on feed

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
    try {
        await connectToDB();

        // Find the existing prompt of all users
        
        const prompts = await Prompt.find({}).populate("creator");

        return new Response(JSON.stringify(prompts), { status: 200 })

    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}

