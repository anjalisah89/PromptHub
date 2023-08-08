'use client'

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams} from 'next/navigation'

import Form from '@components/Form';

// create edit prompt
const EditPrompt = () => {
    const router = useRouter();
    const SearchParams = useSearchParams();
    // API routes in /api/prompt/[id]/route.js (!important)
    // Finding via user ID to fetch prompts from my profile to edit prompt
    const promptId = SearchParams.get('id');
    
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            try {
                // Fetch prompt details from the API using the specified endpoint.
                const response = await fetch(`/api/prompt/${promptId}`);
                
                // Check if the response status indicates success (e.g., status code 200).
                if (!response.ok) {
                    throw new Error(`API request failed with status: ${response.status}`);
                }
    
                // Parse the response as JSON using the .json() method.
                const data = await response.json();
    
                // Update the component's state with the retrieved data.
                setPost({
                    prompt: data.prompt,
                    tag: data.tag,
                });
            } catch (error) {
                // Handle any errors that occur during the fetching process.
                console.error("Error fetching prompt details:", error);
            }
        };
    
        // Call the getPromptDetails function if promptId is available.
        if (promptId) {
            getPromptDetails();
        }
    }, [promptId]);

    // Updating prompt data
    const UpdatePrompt = async (e) =>{
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert('Prompt Id not found');

        try{
            // Fetch prompt details from the API using the specified endpoint.
            const response = await fetch(`/api/prompt/${promptId}`, {
                method:'PATCH',
                body : JSON.stringify({
                    prompt:post.prompt,
                    tag: post.tag
                })

            })
            // Updating prompt data on root feed
            if(response.ok){
                router.push('/');
            }
        
        }
        // Handle any errors that occur during the fetching process.
        catch(error){
            console.log(error);
        } finally{
            setSubmitting(false);
        }
    } 

  return (
    <Form
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={UpdatePrompt}
    />
  )
}

export default EditPrompt