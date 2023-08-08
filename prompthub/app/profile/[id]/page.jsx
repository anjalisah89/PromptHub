'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import Profile from '@components/Profile';

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

const userProfile = ({params}) => {

    const SearchParam = useSearchParams();
    const userName = capitalizeFirstLetter(SearchParam.get('name'));
    const [userPosts, setUserPosts] = useState([]);
  
    // fetch user created prompts to their profile
    useEffect(() => {
    const fetchPosts = async ()=> {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
  
      setUserPosts(data);
    }
  
    // check user session
    if(params?.id){
      fetchPosts();
    };
  },[params.id]);


  return (
    <Profile
    name={userName}
    desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
    data={userPosts}
    />
  )
}

export default userProfile
