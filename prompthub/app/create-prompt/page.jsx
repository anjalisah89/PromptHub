'use client'

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

import Form from '@components/Form';

// create a prompt
const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async (e) =>{
        e.preventDefault();
        setSubmitting(true);

        // send new prompt data via api by submitting 

        try{
            const response = await fetch('/api/prompt/new', {
                method:'POST',
                body : JSON.stringify({
                    prompt:post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })

            })

            // push data to the root feed

            if(response.ok){
                router.push('/');
            }
        
        }
        catch(error){
            console.log(error);
        } finally{
            setSubmitting(false);
        }
    }
  return (
    <Form
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt