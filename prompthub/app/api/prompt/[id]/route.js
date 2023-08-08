// route to perform CURD operations in post prompts from My Profile
// To perform handleEdit and handleDelete functionality 

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET (read)
//route to fetch all the posted prompts on feed to read the existing user prompts 

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
            
        //Find the existing prompt by ID

        const prompt = await Prompt.findById(params.id).populate("creator");
        if(!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
};

//PATCH (update)

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();
    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

//DELETE (delete)

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};