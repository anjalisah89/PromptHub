import Link from 'next/link';

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit
}) => {
  return (
    <section className=' w-full max-w-full flex-center flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span></h1>
        <p className='desc text-left max-w-md'> {type} & Share amazing prompts with others and personalize your feed based on your own interests. Unleash your creativity while discovering the diverse minds of others with any AI-powered platform. </p>
        
        <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex-col gap-7 glassmorphism'> 
        <label>
          <span className='font-satoshi font-semibold text-base text-grey-700'> Your AI Prompt</span>
          <textarea value={post.prompt} onChange={(e) => setPost( {...post,prompt: e.target.value})} placeholder='Write your prompt here...' required className='form_textarea'/>
        </label>
        <br/>
        <label> 
          <span className='font-satoshi font-semibold text-base text-gray-700'> Tags <span className='font-normal ml-2'>(#product, #webdevelopment, #idea #myprompt)</span>
          </span>
          <input value={post.tag} onChange={(e) => setPost( {...post,tag: e.target.value})} placeholder='#tags' className='form_input'/>
        </label>
        
        <div className='flex-end mx-3 pt-5 mb-5 gap-4'>
          <Link href="/" className='text-gray-500'>Cancel</Link>
          <button type='submit' disabled={submitting} className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>{submitting? `${type}...` : type}</button>
          </div>
      </form>
    </section>
  )
}

export default Form