import React, { useState } from 'react'
import SearchBar from '../../components/Search/SearchBar'
import ProfileBar from '../../components/Search/ProfileBar'
import { useSearchUsersQuery } from '../../redux/api';
import { useSelector } from 'react-redux';
import SearchUserSkeleton from '../../components/skeletons/SearchUserSkeleton'

function Search() {
  const [query,setQuery]=useState('');
  const { data,isLoading , isError } = useSearchUsersQuery(query);
  console.log(data);
  return (
    <div className='w-screen flex flex-col justify-start items-center min-h-screen'>
      <SearchBar query={query} setQuery={setQuery}/>
      {isLoading && <>
        <SearchUserSkeleton />
        <SearchUserSkeleton />
        <SearchUserSkeleton />
      </>}
      {!data?.users && <div>Search Users</div>}
      {!isLoading && data?.users.map(user => {
        return <ProfileBar user={user} key={user._id} />
      })}
      {/* {isError && <div className='text-center'>An Error occurred!</div>} */}
    </div>
  )
}

export default Search
Search