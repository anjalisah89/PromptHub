// route to fetch user posted prompts in my profile
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, {params}) => {
    try {
        await connectToDB(); 

        // Fetch all created prompts by the creator to their profile ID

        const prompts = await Prompt.find({ creator: params.id}).populate("creator");

        return new Response(JSON.stringify(prompts), { status: 200 })

    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}

