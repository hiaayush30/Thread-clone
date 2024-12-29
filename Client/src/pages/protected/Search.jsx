import React from 'react'
import SearchBar from '../../components/Search/SearchBar'
import ProfileBar from '../../components/Search/ProfileBar'

function Search() {
  return (
    <div className='w-screen flex flex-col justify-start items-center min-h-screen'>
      <SearchBar/>
      <ProfileBar/>
      <ProfileBar/>
      <ProfileBar/>
      <ProfileBar/>
    </div>
  )
}

export default Search
Search