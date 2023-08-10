'use client'

import {useState, useEffect} from 'react';
import PromptCard from './PromptCard';

// Feed Layout
const PromptCardList = ({ data, handleTagClick }) =>{
  return(
    <div className='mt-16 prompt_layout'>
      {/* map through the array of prompts and render a card for each one */}
      {data.map ((post) => (
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]); 

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

// Fetch all Posts on page load
useEffect(() => {
  fetchPosts();
}, []);


//Filter Prompt by searching through text
const filterPrompts = (searchtext) => {
  const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
  return allPosts.filter(
    (item) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
  );
};

// searching for similar prompts
const handleSearchChange = (e) => {
  clearTimeout(searchTimeout);
  setSearchText(e.target.value);

  // debounce method
  setSearchTimeout(
    setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult);
    }, 500)
  );
};

//Filter using  click on tags
const handleTagClick = (tagName) => {
  setSearchText(tagName);

  const searchResult = filterPrompts(tagName);
  setSearchedResults(searchResult);
};


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type='text' placeholder='Search for a tag or a username' value={searchText} onChange={handleSearchChange} required className='search_input peer'/>
      </form>

       {/* All Prompts */}
       {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed